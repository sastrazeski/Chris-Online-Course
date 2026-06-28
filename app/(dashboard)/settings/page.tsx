import { SettingsPreferences } from "@/components/settings-preferences";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireUser();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink dark:text-slate-100">Pengaturan</h1>
        <p className="mt-2 text-muted">Tema, bahasa, tampilan, dan preferensi umum.</p>
      </div>
      <div className="mt-8">
        <SettingsPreferences />
      </div>
    </div>
  );
}
