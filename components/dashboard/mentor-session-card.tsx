export function MentorSessionCard({
  title,
  mentor,
  schedule
}: {
  title: string;
  mentor: string;
  schedule: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
      <h3 className="font-black text-[#07122D] dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">Bersama {mentor}</p>
      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">{schedule}</p>
      <button className="mt-4 h-10 rounded-xl bg-[#07122D] px-4 text-sm font-black text-white">Daftar</button>
    </div>
  );
}
