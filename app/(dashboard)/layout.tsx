import { DashboardMobileNav, DashboardSidebar } from "@/components/dashboard/sidebar";
import { SubscribeProvider } from "@/components/dashboard/subscribe-provider";
import { DashboardTopNavbar } from "@/components/dashboard/top-navbar";
import { getMidtransClientKey, isMidtransConfigured } from "@/lib/env";
import { getSnapScriptUrl } from "@/lib/midtrans";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SubscribeProvider midtransClientKey={getMidtransClientKey()} midtransConfigured={isMidtransConfigured()} snapScriptUrl={getSnapScriptUrl()}>
      <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
        <div className="lg:flex">
          <DashboardSidebar />
          <div className="min-w-0 flex-1">
            <DashboardTopNavbar />
            <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
          </div>
          <DashboardMobileNav />
        </div>
      </div>
    </SubscribeProvider>
  );
}
