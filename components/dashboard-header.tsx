import Link from "next/link";
import { BookOpen, LayoutDashboard, Shield } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/supabase/types";
import { AccountNav } from "./account-nav";
import { NavBackButton } from "./nav-back-button";

export async function DashboardHeader() {
  const user = await getCurrentUser();
  let profile: { role: UserRole; full_name: string | null } | null = null;

  if (user && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
    profile = data;
  }

  const isAdmin = profile?.role === "admin" || profile?.role === "developer";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <NavBackButton fallbackHref="/dashboard" />
        <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
          <Link href="/dashboard" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-slate-700 transition hover:bg-gray-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/courses" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-slate-700 transition hover:bg-gray-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
            <BookOpen className="h-4 w-4" />
            Courses
          </Link>
          {isAdmin ? (
            <Link href="/admin" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-slate-700 transition hover:bg-gray-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          ) : null}
          {profile?.role === "developer" ? (
            <Link href="/developer" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-slate-700 transition hover:bg-gray-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
              <Shield className="h-4 w-4" />
              Developer
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-2">
          <AccountNav />
        </div>
      </div>
    </header>
  );
}
