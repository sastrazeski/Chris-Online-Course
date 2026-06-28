import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "./env";
import { createClient } from "./supabase/server";
import type { UserRole } from "./supabase/types";

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

  if (!isAdminRole(profile?.role)) {
    redirect("/dashboard");
  }

  return user;
}

export async function requireDeveloper() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (profile?.role !== "developer") {
    redirect("/dashboard");
  }

  return user;
}

export function isAdminRole(role?: UserRole | null) {
  return role === "admin" || role === "developer";
}
