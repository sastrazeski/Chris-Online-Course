import { AlertCircle } from "lucide-react";

export function SetupNotice() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <h2 className="font-semibold">Supabase belum dikonfigurasi</h2>
          <p className="mt-2 text-sm leading-6">
            Buat file <code className="rounded bg-white px-1 py-0.5">.env.local</code> di root project, isi
            <code className="mx-1 rounded bg-white px-1 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> dan
            <code className="mx-1 rounded bg-white px-1 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> atau
            <code className="mx-1 rounded bg-white px-1 py-0.5">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>, lalu restart
            <code className="ml-1 rounded bg-white px-1 py-0.5">npm run dev</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
