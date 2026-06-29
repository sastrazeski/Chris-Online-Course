import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { isTeachingRole, requireProfileRole } from "@/lib/auth";
import { getDashboardProgressStats } from "@/lib/dashboard-progress";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { user, role, fullName } = await requireProfileRole();
  if (isTeachingRole(role)) {
    redirect("/teacher/dashboard");
  }

  const supabase = await createClient();
  const progressStats = await getDashboardProgressStats(supabase, user.id);
  const displayName = fullName || user.email || "Sastra Xez";

  return <DashboardHome displayName={displayName} progressStats={progressStats} />;
}
