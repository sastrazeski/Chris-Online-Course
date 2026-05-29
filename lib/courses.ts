import { notFound, redirect } from "next/navigation";
import { throwReadableError } from "./errors";
import { isSupabaseConfigured } from "./env";
import { createClient } from "./supabase/server";
import type { CourseWithModules } from "./supabase/types";

export async function getPublishedCourses() {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(id))")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throwReadableError(
      error,
      "Failed to load courses. Check that supabase/schema.sql has been run in your Supabase project."
    );
  }
  return (data ?? []) as CourseWithModules[];
}

export async function getCourseBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    notFound();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(*))")
    .eq("slug", slug)
    .single();

  if (error || !data) notFound();

  const course = data as CourseWithModules;
  course.modules.sort((a, b) => a.position - b.position);
  course.modules.forEach((module) => module.lessons.sort((a, b) => a.position - b.position));

  return course;
}

export async function requireEnrollment(courseId: string, userId: string) {
  if (!isSupabaseConfigured()) {
    redirect("/courses");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", courseId)
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (!data) {
    redirect(`/checkout/${courseId}`);
  }

  return data;
}

export async function userHasEnrollment(courseId: string, userId?: string) {
  if (!isSupabaseConfigured()) return false;
  if (!userId) return false;
  const supabase = await createClient();
  const { data } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", courseId)
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  return Boolean(data);
}
