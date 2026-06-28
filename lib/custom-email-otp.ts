import { createCipheriv, createDecipheriv, createHash, randomBytes, randomInt } from "crypto";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export function generateOtp() {
  return String(randomInt(100000, 1000000));
}

export function hashOtp(email: string, otp: string) {
  return createHash("sha256").update(`${getOtpSecret()}:${email.toLowerCase()}:${otp}`).digest("hex");
}

export function encryptPendingPassword(password: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv, tag, encrypted].map((value) => value.toString("base64url")).join(".");
}

export function decryptPendingPassword(value: string) {
  const [ivText, tagText, encryptedText] = value.split(".");

  if (!ivText || !tagText || !encryptedText) {
    throw new Error("Format password pending tidak valid.");
  }

  const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(ivText, "base64url"));
  decipher.setAuthTag(Buffer.from(tagText, "base64url"));

  return Buffer.concat([decipher.update(Buffer.from(encryptedText, "base64url")), decipher.final()]).toString("utf8");
}

export async function sendVerificationEmail({ email, fullName, otp }: { email: string; fullName: string; otp: string }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Red and Blue";

  if (!apiKey || !senderEmail) {
    throw new Error("BREVO_API_KEY dan BREVO_SENDER_EMAIL wajib diisi di .env.local.");
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail
      },
      to: [
        {
          email,
          name: fullName
        }
      ],
      subject: "Kode verifikasi akun Red and Blue",
      htmlContent: getVerificationEmailHtml(otp)
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Brevo gagal mengirim email (${response.status}): ${text}`);
  }
}

function getVerificationEmailHtml(otp: string) {
  return `
    <div style="margin:0;padding:32px;background:#f6f8fc;font-family:Arial,sans-serif;color:#07122d">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:18px;padding:30px;border:1px solid #e5e7eb">
        <p style="margin:0 0 10px;color:#ff304f;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase">Red and Blue Creative Agency</p>
        <h1 style="margin:0 0 14px;font-size:28px;line-height:1.2">Kode verifikasi akun kamu</h1>
        <p style="margin:0 0 22px;color:#667085;font-size:15px;line-height:1.7">Masukkan kode berikut di halaman verifikasi untuk menyelesaikan pendaftaran.</p>
        <div style="margin:0 0 22px;padding:18px;border-radius:14px;background:#fff1f3;text-align:center;font-size:36px;font-weight:900;letter-spacing:8px;color:#ff304f">${otp}</div>
        <p style="margin:0;color:#667085;font-size:13px;line-height:1.6">Kode ini berlaku sementara. Jika kamu tidak merasa mendaftar, abaikan email ini.</p>
      </div>
    </div>
  `;
}

function getOtpSecret() {
  const secret = process.env.AUTH_OTP_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret) {
    throw new Error("AUTH_OTP_SECRET belum dikonfigurasi di .env.local.");
  }

  return secret;
}

function getEncryptionKey() {
  return createHash("sha256").update(getOtpSecret()).digest();
}
