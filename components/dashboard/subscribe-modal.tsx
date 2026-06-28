import { X } from "lucide-react";

export function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#07122D]/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#07122D] dark:text-white">Subscribe untuk Unlock Semua Video</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Dapatkan akses penuh ke semua kelas premium, materi eksklusif, mentor session, dan benefit lainnya.
            </p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 hover:text-[#FF304F] dark:bg-white/10 dark:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <PlanCard title="Monthly" price="Rp99.000" period="/ bulan" />
          <PlanCard title="Yearly" price="Rp799.000" period="/ tahun" badge="Best Value" />
        </div>
        <button className="mt-6 h-12 w-full rounded-2xl bg-[#FF304F] text-sm font-black text-white shadow-lg shadow-red-500/20">
          Subscribe Sekarang
        </button>
      </div>
    </div>
  );
}

function PlanCard({ title, price, period, badge }: { title: string; price: string; period: string; badge?: string }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 p-4 dark:border-white/10">
      {badge ? <span className="absolute right-4 top-4 rounded-full bg-red-50 px-2 py-1 text-xs font-black text-[#FF304F] dark:bg-red-500/10">{badge}</span> : null}
      <p className="font-black text-[#07122D] dark:text-white">{title}</p>
      <p className="mt-4 text-2xl font-black text-[#07122D] dark:text-white">
        {price} <span className="text-sm font-semibold text-slate-500">{period}</span>
      </p>
    </div>
  );
}
