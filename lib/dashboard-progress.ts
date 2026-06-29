import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export type DashboardProgressStats = {
  percentComplete: number;
  completedLessons: number;
  totalLessons: number;
  watchedSeconds: number;
  certificatesEarned: number;
};

export const emptyDashboardProgressStats: DashboardProgressStats = {
  percentComplete: 0,
  completedLessons: 0,
  totalLessons: 0,
  watchedSeconds: 0,
  certificatesEarned: 0
};

export async function getDashboardProgressStats(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<DashboardProgressStats> {
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("user_id", userId)
    .eq("status", "active");

  const courseIds = enrollments?.map((enrollment) => enrollment.course_id) ?? [];
  if (courseIds.length === 0) {
    return emptyDashboardProgressStats;
  }

  const { data: modules } = await supabase.from("modules").select("id").in("course_id", courseIds);
  const moduleIds = modules?.map((module) => module.id) ?? [];
  if (moduleIds.length === 0) {
    return emptyDashboardProgressStats;
  }

  const { data: lessons } = await supabase.from("lessons").select("id").in("module_id", moduleIds);
  const lessonIds = lessons?.map((lesson) => lesson.id) ?? [];
  const totalLessons = lessonIds.length;
  if (totalLessons === 0) {
    return emptyDashboardProgressStats;
  }

  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_id, is_completed, watched_seconds")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds);

  const completedLessons = progressRows?.filter((progress) => progress.is_completed).length ?? 0;
  const watchedSeconds = progressRows?.reduce((total, progress) => total + (progress.watched_seconds ?? 0), 0) ?? 0;

  return {
    percentComplete: Math.round((completedLessons / totalLessons) * 100),
    completedLessons,
    totalLessons,
    watchedSeconds,
    certificatesEarned: 0
  };
}
