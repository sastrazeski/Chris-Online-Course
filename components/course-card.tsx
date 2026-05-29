import Image from "next/image";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Database } from "@/lib/supabase/types";
import { LinkButton } from "./ui/button";

type Course = Database["public"]["Tables"]["courses"]["Row"] & {
  modules?: { lessons?: { id: string }[] }[];
};

export function CourseCard({ course }: { course: Course }) {
  const lessonCount = course.modules?.reduce((total, module) => total + (module.lessons?.length ?? 0), 0) ?? 0;

  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
      <div className="relative aspect-[16/9] bg-gray-100">
        {course.cover_image_url ? (
          <Image src={course.cover_image_url} alt="" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-ink">{course.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{course.description}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted">
            <BookOpen className="h-4 w-4" />
            {lessonCount} lessons
          </span>
          <span className="font-semibold text-ink">{formatPrice(course.price, course.currency)}</span>
        </div>
        <LinkButton href={`/courses/${course.slug}`} className="w-full">
          View course
        </LinkButton>
      </div>
    </article>
  );
}
