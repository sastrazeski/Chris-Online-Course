import { Bell, Search } from "lucide-react";
import { AccountNav } from "@/components/account-nav";
import { SubscribeButton } from "./subscribe-provider";

export function DashboardTopNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-slate-950/90">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6">
        <div className="hidden min-w-44 leading-tight md:block">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#07122D] dark:text-white">Red and Blue</p>
          <p className="text-xs font-semibold text-slate-500">Creative Agency</p>
        </div>
        <label className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Cari kelas, materi, atau topik..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#FF304F] focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>
        <SubscribeButton className="hidden h-11 items-center rounded-2xl bg-[#07122D] px-5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-900 sm:inline-flex">
          Upgrade / Subscribe
        </SubscribeButton>
        <button className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#FF304F] hover:text-[#FF304F] dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <Bell className="h-4 w-4" />
        </button>
        <AccountNav />
      </div>
    </header>
  );
}
