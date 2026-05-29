import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { CourseWithModules, ModuleRow } from "@/lib/supabase/types";
import { createCourse, createLesson, createModule, updateCourse, updateLesson, uploadLessonVideo } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(*))")
    .order("created_at", { ascending: false });

  const adminCourses = (courses ?? []) as CourseWithModules[];
  const modules = adminCourses.flatMap((course) =>
    course.modules.map((module) => ({
      ...module,
      courseTitle: course.title
    }))
  ) as Array<ModuleRow & { courseTitle: string }>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div>
        <h1 className="text-3xl font-semibold text-ink">Admin dashboard</h1>
        <p className="mt-2 text-muted">Create courses, modules, and lessons.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <form action={createCourse} className="space-y-4 rounded-lg border border-line bg-white p-5 shadow-panel">
          <h2 className="text-lg font-semibold text-ink">New course</h2>
          <Input name="title" label="Title" required />
          <Input name="slug" label="Slug" />
          <Field name="description" label="Description" required />
          <Input name="coverImageUrl" label="Cover image URL" />
          <Input name="price" label="Price IDR" type="number" required />
          <label className="flex items-center gap-2 text-sm text-ink">
            <input name="isPublished" type="checkbox" className="h-4 w-4" />
            Published
          </label>
          <Submit>Create course</Submit>
        </form>

        <form action={createModule} className="space-y-4 rounded-lg border border-line bg-white p-5 shadow-panel">
          <h2 className="text-lg font-semibold text-ink">New module</h2>
          <Select name="courseId" label="Course" required>
            {adminCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Select>
          <Input name="title" label="Title" required />
          <Input name="position" label="Position" type="number" defaultValue="0" />
          <Submit>Create module</Submit>
        </form>

        <form action={createLesson} className="space-y-4 rounded-lg border border-line bg-white p-5 shadow-panel">
          <h2 className="text-lg font-semibold text-ink">New lesson</h2>
          <Select name="moduleId" label="Module" required>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.courseTitle} / {module.title}
              </option>
            ))}
          </Select>
          <Input name="title" label="Title" required />
          <Input name="slug" label="Slug" />
          <Field name="description" label="Description" />
          <Input name="durationSeconds" label="Duration seconds" type="number" defaultValue="0" />
          <Input name="position" label="Position" type="number" defaultValue="0" />
          <label className="flex items-center gap-2 text-sm text-ink">
            <input name="isPreview" type="checkbox" className="h-4 w-4" />
            Free preview
          </label>
          <Submit>Create lesson</Submit>
        </form>
      </div>

      <section className="mt-10 rounded-lg border border-line bg-white p-5 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Manage courses</h2>
            <p className="mt-1 text-sm text-muted">Edit sales copy, pricing, publish status, and lesson videos.</p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-ink">{adminCourses.length} courses</span>
        </div>
        <div className="mt-4 space-y-6">
          {adminCourses.map((course) => (
            <div key={course.id} className="rounded-lg border border-line p-4">
              <form action={updateCourse} className="grid gap-4 lg:grid-cols-2">
                <input type="hidden" name="courseId" value={course.id} />
                <Input name="title" label="Course title" defaultValue={course.title} required />
                <Input name="slug" label="Slug" defaultValue={course.slug} required />
                <Field name="description" label="Sales description" defaultValue={course.description} required />
                <div className="space-y-4">
                  <Input name="coverImageUrl" label="Cover image URL" defaultValue={course.cover_image_url ?? ""} />
                  <Input name="price" label="Price IDR" type="number" defaultValue={course.price} required />
                  <label className="flex items-center gap-2 text-sm text-ink">
                    <input name="isPublished" type="checkbox" defaultChecked={course.is_published} className="h-4 w-4" />
                    Published
                  </label>
                  <Submit>Save course</Submit>
                </div>
              </form>

              <div className="mt-5">
                <p className="text-sm font-semibold text-muted">
                  {course.modules.length} modules / {course.modules.flatMap((module) => module.lessons).length} lessons
                </p>
                <div className="mt-3 space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="rounded-md bg-gray-50 p-4">
                      <h3 className="font-semibold text-ink">{module.title}</h3>
                      <div className="mt-3 space-y-3">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="grid gap-3 rounded-md border border-line bg-white p-3 lg:grid-cols-[1fr_280px]">
                            <form action={updateLesson} className="grid gap-3 lg:grid-cols-2">
                              <input type="hidden" name="lessonId" value={lesson.id} />
                              <Input name="title" label="Lesson title" defaultValue={lesson.title} required />
                              <Input name="slug" label="Slug" defaultValue={lesson.slug} required />
                              <Field name="description" label="Lesson content/notes" defaultValue={lesson.description ?? ""} />
                              <div className="space-y-3">
                                <Input name="durationSeconds" label="Duration seconds" type="number" defaultValue={lesson.duration_seconds} />
                                <Input name="position" label="Position" type="number" defaultValue={lesson.position} />
                                <label className="flex items-center gap-2 text-sm text-ink">
                                  <input name="isPreview" type="checkbox" defaultChecked={lesson.is_preview} className="h-4 w-4" />
                                  Free preview
                                </label>
                                <Submit>Save lesson</Submit>
                              </div>
                            </form>
                            <form action={uploadLessonVideo} className="rounded-md border border-dashed border-line bg-gray-50 p-3">
                              <input type="hidden" name="lessonId" value={lesson.id} />
                              <label className="block text-sm font-medium text-ink">
                                Lesson video
                                <input
                                  name="video"
                                  type="file"
                                  accept="video/mp4,video/webm,video/ogg"
                                  required
                                  className="mt-2 block w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-brand-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-700"
                                />
                              </label>
                              <p className="mt-2 text-xs text-muted">{lesson.video_url ? "Video uploaded. Choose a new file to replace it." : "Upload MP4, WebM, or OGG."}</p>
                              <button className="mt-3 h-10 w-full rounded-md bg-ink text-sm font-semibold text-white hover:bg-gray-800">
                                Upload video
                              </button>
                            </form>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" {...rest} />
    </label>
  );
}

function Field(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <textarea className="mt-2 min-h-24 w-full rounded-md border border-line px-3 py-2 outline-none focus:border-brand-600" {...rest} />
    </label>
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const { label, children, ...rest } = props;
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <select className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" {...rest}>
        {children}
      </select>
    </label>
  );
}

function Submit({ children }: { children: React.ReactNode }) {
  return <button className="h-10 w-full rounded-md bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">{children}</button>;
}
