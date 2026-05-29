import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { signUp } from "../actions";

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#dcfce7_0,transparent_34%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-12">
      <form action={signUp} className="w-full max-w-md space-y-5 rounded-lg border border-white/80 bg-white/95 p-7 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-brand-600 text-white shadow-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Create account</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Buy courses and save progress across lessons.</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Student
          </span>
        </div>
        {params.error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
        <label className="block text-sm font-medium text-ink">
          Full name
          <input
            name="fullName"
            required
            placeholder="Masukkan nama lengkap, contoh: RNB Digital"
            className="mt-2 h-12 w-full rounded-md border border-line bg-white px-4 text-sm outline-none transition placeholder:text-ink/20 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="Masukkan email, contoh: nama@email.com"
            className="mt-2 h-12 w-full rounded-md border border-line bg-white px-4 text-sm outline-none transition placeholder:text-ink/20 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Password
          <PasswordInput name="password" required minLength={8} placeholder="Minimal 8 karakter" />
        </label>
        <button className="h-12 w-full rounded-md bg-brand-600 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-600/20">
          Create account
        </button>
        <p className="text-center text-sm text-muted">
          Already registered?{" "}
          <Link href="/auth/sign-in" className="font-semibold text-brand-700">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
