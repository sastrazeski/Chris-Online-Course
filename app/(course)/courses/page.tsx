import { CourseCard } from "@/components/course-card";
import { SetupNotice } from "@/components/setup-notice";
import { getPublishedCourses } from "@/lib/courses";
import { isSupabaseConfigured } from "@/lib/env";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-ink">Courses</h1>
      <p className="mt-2 max-w-2xl text-muted">Choose a course, complete payment, and access protected lessons.</p>
      {!configured ? <div className="mt-6"><SetupNotice /></div> : null}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
