import { Lock, PlayCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getCourseBySlug, userHasEnrollment } from "@/lib/courses";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const user = await getCurrentUser();
  const enrolled = await userHasEnrollment(course.id, user?.id);
  const firstLesson = course.modules.flatMap((module) => module.lessons)[0];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Course detail</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{course.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{course.description}</p>

        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Curriculum</h2>
          {course.modules.map((module) => (
            <div key={module.id} className="rounded-lg border border-line bg-white p-5 shadow-panel">
              <h3 className="font-semibold text-ink">{module.title}</h3>
              <div className="mt-4 divide-y divide-line">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="flex items-center gap-3 text-ink">
                      {lesson.is_preview || enrolled ? (
                        <PlayCircle className="h-4 w-4 text-brand-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted" />
                      )}
                      {lesson.title}
                    </span>
                    {lesson.is_preview || enrolled ? (
                      <LinkButton href={`/learn/${course.slug}/${lesson.slug}`} variant="secondary">
                        Watch
                      </LinkButton>
                    ) : (
                      <span className="text-muted">Paid</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-panel">
        <p className="text-3xl font-semibold text-ink">{formatPrice(course.price, course.currency)}</p>
        <p className="mt-3 text-sm leading-6 text-muted">One-time access to all modules, lessons, and progress tracking.</p>
        <div className="mt-6 space-y-3">
          {enrolled ? (
            <LinkButton href={firstLesson ? `/learn/${course.slug}/${firstLesson.slug}` : "/dashboard"} className="w-full">
              Continue learning
            </LinkButton>
          ) : (
            <LinkButton href={user ? `/checkout/${course.id}` : `/auth/sign-in?next=/courses/${course.slug}`} className="w-full">
              Buy course
            </LinkButton>
          )}
          <LinkButton href="/courses" variant="secondary" className="w-full">
            Browse all courses
          </LinkButton>
        </div>
      </aside>
    </div>
  );
}
