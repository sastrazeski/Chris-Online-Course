import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { CompanyLogo } from "./company-logo";
import { SignOutButton } from "./sign-out-button";
import { ThemeToggle } from "./theme-toggle";
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
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-ink dark:text-slate-100" aria-label="Red and Blue home">
          <CompanyLogo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {[
            ["Home", "/"],
            ["About Us", "/#about"],
            ["Services", "/#services"],
            ["Portfolio", "/#portfolio"],
            ["Blog", "/#blog"],
            ["Contact", "/#contact"]
          ].map(([label, href]) => (
            <Link key={label} href={href} className="text-slate-700 transition hover:text-red-500 dark:text-slate-300">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LinkButton href="/courses" variant="secondary" className="hidden gap-2 border-red-500/35 text-red-500 sm:inline-flex">
            <GraduationCap className="h-4 w-4" />
            Online Course
          </LinkButton>
          <LinkButton href="/#contact">Hubungi Kami</LinkButton>
          {user ? (
            <div className="hidden items-center gap-2 xl:flex">
              <Link href="/dashboard" className="px-3 py-2 text-sm font-semibold text-muted hover:text-ink dark:hover:text-slate-100">
                Dashboard
              </Link>
              {profile?.role === "admin" ? (
                <Link href="/admin" className="px-3 py-2 text-sm font-semibold text-muted hover:text-ink dark:hover:text-slate-100">
                  Admin
                </Link>
              ) : null}
              <SignOutButton />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
