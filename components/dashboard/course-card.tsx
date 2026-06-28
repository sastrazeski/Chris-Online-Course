import { Lock, Play } from "lucide-react";
import Image from "next/image";

export function DashboardCourseCard({
  title,
  image,
  duration,
  progress,
  onLockedClick
}: {
  title: string;
  image: string;
  duration: string;
  progress: number;
  onLockedClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onLockedClick}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[#07122D]/55" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[#07122D] shadow-xl">
            <Lock className="h-6 w-6" />
          </span>
        </div>
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-white">{duration}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-50 text-[#FF304F] dark:bg-red-500/10">
            <Play className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 font-black text-[#07122D] dark:text-white">{title}</h3>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full rounded-full bg-[#FF304F]" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500">{progress}% selesai</p>
          </div>
        </div>
      </div>
    </button>
  );
}
