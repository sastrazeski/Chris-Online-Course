"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { decryptPendingPassword, encryptPendingPassword, generateOtp, hashOtp, sendVerificationEmail } from "@/lib/custom-email-otp";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password"));
  const next = String(formData.get("next") || "/dashboard");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const message = getAuthErrorMessage(error);
    if (message.toLowerCase().includes("email not confirmed")) {
      redirect(`/auth/verify?email=${encodeURIComponent(email)}&message=${encodeURIComponent("Cek email kamu dan masukkan kode verifikasi sebelum login.")}`);
    }

    redirect(`/auth/sign-in?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password"));
  const fullName = String(formData.get("fullName") || "").trim();
  const admin = createAdminClient();

  if (!isValidEmail(email)) {
    redirect(`/auth/sign-up?error=${encodeURIComponent("Masukkan alamat email yang valid.")}`);
  }

  if (!fullName) {
    redirect(`/auth/sign-up?error=${encodeURIComponent("Nama lengkap wajib diisi.")}`);
  }

  if (password.length < 8) {
    redirect(`/auth/sign-up?error=${encodeURIComponent("Password minimal 8 karakter.")}`);
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const pendingRegistration = {
    email,
    full_name: fullName,
    encrypted_password: encryptPendingPassword(password),
    otp_hash: hashOtp(email, otp),
    otp_expires_at: expiresAt,
    attempts: 0,
    last_sent_at: new Date().toISOString()
  };

  const { error: upsertError } = await admin.from("pending_registrations").upsert(pendingRegistration);
  if (upsertError) {
    console.error("Pending registration upsert failed", upsertError);
    redirect(`/auth/sign-up?error=${encodeURIComponent("Gagal membuat sesi verifikasi. Pastikan SQL pending_registrations sudah dijalankan di Supabase.")}`);
  }

  try {
    await sendVerificationEmail({ email, fullName, otp });
  } catch (error) {
    await admin.from("pending_registrations").delete().eq("email", email);
    console.error("Brevo verification email failed", error);
    redirect(`/auth/sign-up?error=${encodeURIComponent(getAuthErrorMessage(error, "signup"))}`);
  }

  redirect(`/auth/verify?email=${encodeURIComponent(email)}&message=${encodeURIComponent("Kode verifikasi sudah dikirim ke email kamu.")}`);
}

export async function verifyEmailCode(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const token = String(formData.get("token") || "").replace(/\s+/g, "");
  const admin = createAdminClient();

  if (!isValidEmail(email)) {
    redirect(`/auth/verify?error=${encodeURIComponent("Masukkan alamat email yang valid.")}`);
  }

  if (!token || token.length < 6) {
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Masukkan kode verifikasi yang dikirim ke email kamu.")}`);
  }

  const { data: pending, error: pendingError } = await admin.from("pending_registrations").select("*").eq("email", email).single();
  if (pendingError || !pending) {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user?.email?.toLowerCase() === email) {
      revalidatePath("/", "layout");
      redirect("/dashboard");
    }

    redirect(
      `/auth/sign-in?message=${encodeURIComponent("Akun sudah terverifikasi atau kode sudah dipakai. Silakan login dengan email dan password kamu.")}`
    );
  }

  if (new Date(pending.otp_expires_at).getTime() < Date.now()) {
    await admin.from("pending_registrations").delete().eq("email", email);
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Kode verifikasi sudah kedaluwarsa. Silakan daftar ulang atau kirim ulang kode.")}`);
  }

  if (pending.attempts >= 5) {
    await admin.from("pending_registrations").delete().eq("email", email);
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Terlalu banyak percobaan kode. Silakan daftar ulang.")}`);
  }

  if (hashOtp(email, token) !== pending.otp_hash) {
    await admin.from("pending_registrations").update({ attempts: pending.attempts + 1 }).eq("email", email);
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Kode verifikasi salah.")}`);
  }

  const password = decryptPendingPassword(pending.encrypted_password);
  const { error: createUserError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: pending.full_name
    }
  });

  if (createUserError) {
    console.error("Supabase admin create user failed", createUserError);
    const alreadyRegistered =
      createUserError.message.toLowerCase().includes("already") ||
      createUserError.message.toLowerCase().includes("registered") ||
      createUserError.message.toLowerCase().includes("exists");

    if (alreadyRegistered) {
      const supabase = await createClient();
      const { error: duplicateSignInError } = await supabase.auth.signInWithPassword({ email, password });
      await admin.from("pending_registrations").delete().eq("email", email);

      if (!duplicateSignInError) {
        revalidatePath("/", "layout");
        redirect("/dashboard");
      }

      redirect(`/auth/sign-in?message=${encodeURIComponent("Email ini sudah terdaftar. Silakan login dengan email dan password kamu.")}`);
    }

    const message = getAuthErrorMessage(createUserError, "verify");
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent(message)}`);
  }

  await admin.from("pending_registrations").delete().eq("email", email);

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    redirect(`/auth/sign-in?message=${encodeURIComponent("Akun berhasil dibuat. Silakan login dengan email dan password kamu.")}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function resendVerificationCode(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const admin = createAdminClient();

  if (!isValidEmail(email)) {
    redirect(`/auth/verify?error=${encodeURIComponent("Masukkan alamat email yang valid untuk kirim ulang kode.")}`);
  }

  const { data: pending, error: pendingError } = await admin.from("pending_registrations").select("*").eq("email", email).single();
  if (pendingError || !pending) {
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Data pendaftaran belum ada. Silakan daftar ulang.")}`);
  }

  const lastSentAt = new Date(pending.last_sent_at).getTime();
  if (Date.now() - lastSentAt < 60 * 1000) {
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Tunggu 1 menit sebelum kirim ulang kode.")}`);
  }

  const otp = generateOtp();
  const { error: updateError } = await admin
    .from("pending_registrations")
    .update({
      otp_hash: hashOtp(email, otp),
      otp_expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      attempts: 0,
      last_sent_at: new Date().toISOString()
    })
    .eq("email", email);

  if (updateError) {
    console.error("Pending registration resend update failed", updateError);
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent("Gagal menyiapkan kode baru. Coba lagi.")}`);
  }

  try {
    await sendVerificationEmail({ email, fullName: pending.full_name, otp });
  } catch (error) {
    console.error("Brevo resend verification failed", error);
    redirect(`/auth/verify?email=${encodeURIComponent(email)}&error=${encodeURIComponent(getAuthErrorMessage(error, "resend"))}`);
  }

  redirect(`/auth/verify?email=${encodeURIComponent(email)}&message=${encodeURIComponent("Kode baru sudah dikirim. Cek inbox atau folder spam.")}`);
}

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getAuthErrorMessage(error: unknown, context: "signin" | "signup" | "verify" | "resend" = "signin") {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (context === "signup" || context === "resend") {
    return "Brevo gagal mengirim email verifikasi. Cek BREVO_API_KEY, BREVO_SENDER_EMAIL, sender Brevo yang terverifikasi, dan limit akun Brevo.";
  }

  if (context === "verify") {
    return "Kode verifikasi tidak bisa diproses. Pastikan kode benar, belum kedaluwarsa, lalu coba kirim ulang kode.";
  }

  return "Terjadi masalah pada proses auth. Cek konfigurasi Supabase Email Provider dan SMTP, lalu coba lagi.";
}
