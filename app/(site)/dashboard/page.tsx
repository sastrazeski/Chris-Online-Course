import Link from "next/link";
import { BookOpen, CheckCircle2, Settings } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { LinkButton } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { EnrollmentWithCourse } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*, modules(*, lessons(*)))")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("enrolled_at", { ascending: false });
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Student area</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">My learning dashboard</h1>
          <p className="mt-2 text-muted">Purchased courses, subscription access, and current progress.</p>
        </div>
        {isAdmin ? (
          <LinkButton href="/admin" variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" />
            Owner admin
          </LinkButton>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5 shadow-panel">
          <p className="text-sm font-medium text-muted">Account</p>
          <p className="mt-2 font-semibold text-ink">{profile?.full_name || user.email}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-panel">
          <p className="text-sm font-medium text-muted">Role</p>
          <p className="mt-2 font-semibold capitalize text-ink">{profile?.role ?? "student"}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-panel">
          <p className="text-sm font-medium text-muted">Active courses</p>
          <p className="mt-2 font-semibold text-ink">{enrollments?.length ?? 0}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {((enrollments ?? []) as EnrollmentWithCourse[]).map((enrollment) => {
          const course = enrollment.courses;
          const lessons = course.modules.flatMap((module) => module.lessons);
          const firstLesson = lessons.sort((a, b) => a.position - b.position)[0];

          return (
            <Link
              key={enrollment.id}
              href={firstLesson ? `/learn/${course.slug}/${firstLesson.slug}` : `/courses/${course.slug}`}
              className="rounded-lg border border-line bg-white p-5 shadow-panel transition hover:border-brand-600"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-ink">{course.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{course.description}</p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">Enrolled</span>
              </div>
              <div className="mt-5 flex gap-6 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {lessons.length} lessons
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Continue course
                </span>
              </div>
            </Link>
          );
        })}
        {enrollments?.length === 0 ? (
          <div className="rounded-lg border border-line bg-white p-8 text-center shadow-panel">
            <h2 className="text-lg font-semibold text-ink">No purchased courses yet</h2>
            <p className="mt-2 text-muted">Browse courses and complete checkout to start learning.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
