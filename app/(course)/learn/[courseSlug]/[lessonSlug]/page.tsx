import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProgressToggle } from "@/components/progress-toggle";
import { VideoPlayer } from "@/components/video-player";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getPlayableVideoUrl } from "@/lib/video-security";
import type { CourseWithModules, LessonRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const user = await requireUser();
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(*))")
    .eq("slug", courseSlug)
    .single();

  if (!course) notFound();

  const typedCourse = course as CourseWithModules;
  const modules = typedCourse.modules.sort((a, b) => a.position - b.position);
  modules.forEach((module) => module.lessons.sort((a, b) => a.position - b.position));

  const lessons = modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title }))
  ) as Array<LessonRow & { moduleTitle: string }>;
  const lesson = lessons.find((item) => item.slug === lessonSlug);
  if (!lesson) notFound();

  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", course.id)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!enrollment && !lesson.is_preview) {
    redirect(`/checkout/${course.id}`);
  }

  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("is_completed")
    .eq("lesson_id", lesson.id)
    .eq("user_id", user.id)
    .maybeSingle();
  const videoSrc = await getPlayableVideoUrl(lesson.video_url);
  const watermark = `${user.email ?? user.id} | ${new Date().toISOString().slice(0, 10)}`;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section>
        <VideoPlayer src={videoSrc} title={lesson.title} watermark={watermark} />
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{lesson.moduleTitle}</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">{lesson.title}</h1>
            {lesson.description ? <p className="mt-3 max-w-3xl leading-7 text-muted">{lesson.description}</p> : null}
          </div>
          <ProgressToggle lessonId={lesson.id} initialCompleted={Boolean(progress?.is_completed)} />
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-line bg-white p-5 shadow-panel">
        <h2 className="font-semibold text-ink">{typedCourse.title}</h2>
        <div className="mt-4 space-y-5">
          {modules.map((module) => (
            <div key={module.id}>
              <h3 className="text-sm font-semibold text-muted">{module.title}</h3>
              <div className="mt-2 space-y-1">
                {module.lessons.map((item) => (
                  <Link
                    key={item.id}
                    href={`/learn/${typedCourse.slug}/${item.slug}`}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      item.id === lesson.id ? "bg-brand-50 font-semibold text-brand-700" : "text-ink hover:bg-gray-50"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
