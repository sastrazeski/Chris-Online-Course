"use client";

import Link from "next/link";
import { ChevronDown, LogIn, LogOut, Palette, Settings, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import type { UserRole } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type AccountMenuProps = {
  user:
    | {
        email: string | null;
        name: string | null;
        role: UserRole;
      }
    | null;
};

export function AccountMenu({ user }: AccountMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const displayName = user?.name || user?.email || "Anonymous";
  const initials = getInitials(displayName);
  const roleLabel = formatRole(user?.role ?? "student");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div ref={menuRef} className="relative flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-gray-50 text-slate-500 transition hover:border-red-500 hover:text-red-500 dark:border-white/15 dark:bg-white/5 dark:text-slate-300"
          aria-label="Buka menu anonymous"
          aria-expanded={isOpen}
        >
          <UserCircle className="h-6 w-6" />
        </button>
        <div className="hidden leading-tight sm:block">
          <p className="text-xs font-semibold text-muted">Anonymous</p>
          <p className="text-sm font-semibold">
            <Link href="/auth/sign-in" className="text-ink hover:text-red-500 dark:text-slate-100">
              Login
            </Link>
            <span className="mx-1 text-muted">/</span>
            <Link href="/auth/sign-up" className="text-red-500 hover:text-red-600">
              Daftar
            </Link>
          </p>
        </div>
        {isOpen ? <AnonymousMenu toggleTheme={toggleTheme} isDark={isDark} /> : null}
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 text-left transition hover:border-red-500 dark:border-white/15 dark:bg-white/5"
        aria-label="Buka menu akun"
        aria-expanded={isOpen}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-red-500 text-sm font-bold uppercase text-white">
          {initials}
        </span>
        <span className="hidden max-w-32 leading-tight md:block">
          <span className="block truncate text-sm font-semibold text-ink dark:text-slate-100">{displayName}</span>
          <span className="block text-xs font-medium text-muted">{roleLabel}</span>
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted transition", isOpen ? "rotate-180" : null)} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-lg border border-line bg-white shadow-2xl shadow-slate-900/10 dark:border-white/15 dark:bg-slate-900">
          <div className="border-b border-line p-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-red-500 text-sm font-bold uppercase text-white">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink dark:text-slate-100">{displayName}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
          </div>

          <MenuSection title="Menu">
            <Link href="/settings" onClick={() => setIsOpen(false)} className="account-menu-item">
              <Settings className="h-4 w-4" />
              <span>Pengaturan</span>
            </Link>
            <Link href="/account" onClick={() => setIsOpen(false)} className="account-menu-item">
              <UserCircle className="h-4 w-4" />
              <span>Account</span>
              <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-500/10">
                {roleLabel}
              </span>
            </Link>
          </MenuSection>

          <div className="border-t border-line p-2 dark:border-white/10">
            <button type="button" onClick={signOut} className="account-menu-item w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AnonymousMenu({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-lg border border-line bg-white shadow-2xl shadow-slate-900/10 dark:border-white/15 dark:bg-slate-900">
      <div className="border-b border-line p-4 dark:border-white/10">
        <p className="text-sm font-semibold text-ink dark:text-slate-100">Anonymous</p>
        <p className="mt-1 text-xs text-muted">Login untuk membuka dashboard dan course kamu.</p>
      </div>
      <div className="p-2">
        <Link href="/auth/sign-in" className="account-menu-item">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Link>
        <Link href="/auth/sign-up" className="account-menu-item">
          <UserCircle className="h-4 w-4" />
          <span>Daftar</span>
        </Link>
        <button type="button" onClick={toggleTheme} className="account-menu-item w-full">
          <Palette className="h-4 w-4" />
          <span>Tema</span>
          <span className="ml-auto text-xs text-muted">{isDark ? "Gelap" : "Terang"}</span>
        </button>
      </div>
    </div>
  );
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line p-2 dark:border-white/10">
      <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function getInitials(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0]}${parts[1][0]}`;
}

function formatRole(role: UserRole) {
  const labels: Record<UserRole, string> = {
    student: "Siswa",
    teacher: "Pengajar",
    instructor: "Instructor",
    admin: "Admin",
    developer: "Developer"
  };

  return labels[role];
}
