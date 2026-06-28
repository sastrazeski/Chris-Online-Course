export function ProgressCard() {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-lg font-black text-[#07122D] dark:text-white">Progress Belajar</h2>
      <div className="mt-5 flex items-center gap-5">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#FF304F_126deg,#EEF2F7_0deg)]">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-lg font-black text-[#07122D] dark:bg-slate-950 dark:text-white">
            35%
          </div>
        </div>
        <div>
          <p className="font-black text-[#07122D] dark:text-white">35% Selesai</p>
          <p className="mt-1 text-sm text-slate-500">Konsisten minggu ini</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 text-sm">
        <Metric label="Kelas Selesai" value="12 / 36" />
        <Metric label="Total Jam Belajar" value="8j 45m" />
        <Metric label="Sertifikat Didapat" value="3" />
      </div>
      <a href="#learning" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#FF304F] text-sm font-black text-white shadow-lg shadow-red-500/20">
        Lanjutkan Belajar
      </a>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5">
      <span className="text-slate-500">{label}</span>
      <span className="font-black text-[#07122D] dark:text-white">{value}</span>
    </div>
  );
}
