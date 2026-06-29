import type { DashboardProgressStats } from "@/lib/dashboard-progress";

export function ProgressCard({ stats }: { stats: DashboardProgressStats }) {
  const progressDegrees = Math.round((stats.percentComplete / 100) * 360);
  const learningTime = formatLearningTime(stats.watchedSeconds);

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-lg font-black text-[#07122D] dark:text-white">Progress Belajar</h2>
      <div className="mt-5 flex items-center gap-5">
        <div
          className="grid h-28 w-28 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#FF304F ${progressDegrees}deg, #EEF2F7 0deg)`
          }}
        >
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-lg font-black text-[#07122D] dark:bg-slate-950 dark:text-white">
            {stats.percentComplete}%
          </div>
        </div>
        <div>
          <p className="font-black text-[#07122D] dark:text-white">{stats.percentComplete}% Selesai</p>
          <p className="mt-1 text-sm text-slate-500">
            {stats.totalLessons > 0 ? "Berdasarkan progress asli" : "Belum ada progress"}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 text-sm">
        <Metric label="Kelas Selesai" value={`${stats.completedLessons} / ${stats.totalLessons}`} />
        <Metric label="Total Jam Belajar" value={learningTime} />
        <Metric label="Sertifikat Didapat" value={String(stats.certificatesEarned)} />
      </div>
      <a href="#learning" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#FF304F] text-sm font-black text-white shadow-lg shadow-red-500/20">
        Lanjutkan Belajar
      </a>
    </aside>
  );
}

function formatLearningTime(totalSeconds: number) {
  if (totalSeconds <= 0) return "0j 0m";

  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}j ${minutes}m`;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5">
      <span className="text-slate-500">{label}</span>
      <span className="font-black text-[#07122D] dark:text-white">{value}</span>
    </div>
  );
}
