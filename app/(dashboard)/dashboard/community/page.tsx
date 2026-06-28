import { DashboardSectionPage } from "@/components/dashboard/section-page";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function CommunityDashboardPage() {
  await requireUser();
  return <DashboardSectionPage section="community" />;
}
