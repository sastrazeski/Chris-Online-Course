import { DashboardSectionPage } from "@/components/dashboard/section-page";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EcommerceServicesDashboardPage() {
  await requireUser();
  return <DashboardSectionPage section="ecommerce-services" />;
}
