import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  const displayName = profile?.full_name || user.email || "Sastra Xez";

  return <DashboardHome displayName={displayName} />;
}
