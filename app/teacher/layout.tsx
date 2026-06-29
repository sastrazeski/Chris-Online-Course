import { TeacherShell } from "@/components/teacher/teacher-shell";
import { requireTeacherDashboardUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  await requireTeacherDashboardUser();

  return <TeacherShell>{children}</TeacherShell>;
}
