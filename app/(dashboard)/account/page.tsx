import Link from "next/link";
import { BookOpen, LayoutDashboard, Mail, Shield, UserCircle } from "lucide-react";
import { isTeachingRole, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { LinkButton } from "@/components/ui/button";
import type { UserRole } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  const { count: activeCourseCount } = await supabase
    .from("enrollments")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "active");

  const role = profile?.role ?? "student";
  const displayName = profile?.full_name || user.email || "User";
  const initials = getInitials(displayName);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Account</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink dark:text-slate-100">Informasi akun</h1>
        <p className="mt-2 text-muted">Profil, akses dashboard, status akun, dan course kamu.</p>
      </div>

      <section className="mt-8 rounded-lg border border-line bg-white p-6 shadow-panel dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-red-500 text-xl font-bold uppercase text-white">
              {initials}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-ink dark:text-slate-100">{displayName}</h2>
              <p className="mt-1 text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold capitalize text-red-600 dark:bg-red-500/10">
            {formatRole(role)}
          </span>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoCard icon={<UserCircle className="h-5 w-5" />} title="Nama" value={displayName} />
        <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" value={user.email ?? "-"} />
        <InfoCard icon={<Shield className="h-5 w-5" />} title="Status akun" value={formatRole(role)} />
        <InfoCard icon={<BookOpen className="h-5 w-5" />} title="Active courses" value={String(activeCourseCount ?? 0)} />
      </div>

      <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-panel dark:border-white/10 dark:bg-white/5">
        <h2 className="font-semibold text-ink dark:text-slate-100">Akses akun</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <LinkButton href={isTeachingRole(role) ? "/teacher/dashboard" : "/dashboard"} className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </LinkButton>
          <LinkButton href="/courses" variant="secondary" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Courses
          </LinkButton>
          {role === "admin" || role === "developer" ? (
            <Link href="/admin" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-semibold text-ink transition hover:bg-gray-50 dark:border-white/15 dark:text-slate-100 dark:hover:bg-white/10">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          ) : null}
          {role === "developer" ? (
            <Link href="/developer" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-semibold text-ink transition hover:bg-gray-50 dark:border-white/15 dark:text-slate-100 dark:hover:bg-white/10">
              <Shield className="h-4 w-4" />
              Developer
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-panel dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-red-50 text-red-500 dark:bg-red-500/10">{icon}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-1 truncate font-semibold capitalize text-ink dark:text-slate-100">{value}</p>
        </div>
      </div>
    </div>
  );
}

function getInitials(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
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
