import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "./env";
import { createClient } from "./supabase/server";

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return user;
}
