import { DashboardSectionPage } from "@/components/dashboard/section-page";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function CertificatesDashboardPage() {
  await requireUser();
  return <DashboardSectionPage section="certificates" />;
}
