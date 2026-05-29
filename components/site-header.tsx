import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out-button";
import { LinkButton } from "./ui/button";

export async function SiteHeader() {
  const user = await getCurrentUser();
  let profile: { role: "student" | "admin" } | null = null;

  if (user && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    profile = data;
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <GraduationCap className="h-6 w-6 text-brand-600" />
          CourseStack
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/courses" className="px-3 py-2 text-muted hover:text-ink">
            Courses
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="px-3 py-2 text-muted hover:text-ink">
                Dashboard
              </Link>
              {profile?.role === "admin" ? (
                <Link href="/admin" className="px-3 py-2 text-muted hover:text-ink">
                  Admin
                </Link>
              ) : null}
              <SignOutButton />
            </>
          ) : (
            <LinkButton href="/auth/sign-in" variant="secondary">
              Sign in
            </LinkButton>
          )}
        </nav>
      </div>
    </header>
  );
}
