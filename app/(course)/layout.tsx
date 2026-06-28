import { CourseHeader } from "@/components/course-header";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseHeader />
      <main>{children}</main>
    </>
  );
}
