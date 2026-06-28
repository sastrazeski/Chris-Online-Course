import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/supabase/types";
import { AccountMenu } from "./account-menu";

export async function AccountNav() {
  const user = await getCurrentUser();
  let profile: { role: UserRole; full_name: string | null } | null = null;

  if (user && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
    profile = data;
  }

  return (
    <AccountMenu
      user={
        user
          ? {
              email: user.email ?? null,
              name: profile?.full_name ?? null,
              role: profile?.role ?? "student"
            }
          : null
      }
    />
  );
}
