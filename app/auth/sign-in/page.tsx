import Link from "next/link";
import { BookOpen, LogIn } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { signIn } from "../actions";

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#dbeafe_0,transparent_34%),linear-gradient(135deg,#f8fafc_0%,#ecfdf5_100%)] px-4 py-12">
      <form action={signIn} className="w-full max-w-md space-y-5 rounded-lg border border-white/80 bg-white/95 p-7 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-brand-600 text-white shadow-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">Sign in</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Access your courses and continue learning.</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <LogIn className="h-3.5 w-3.5" />
            Login
          </span>
        </div>
        {params.error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
        <input type="hidden" name="next" value={params.next ?? "/dashboard"} />
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
          <PasswordInput name="password" required placeholder="Masukkan password" />
        </label>
        <button className="h-12 w-full rounded-md bg-brand-600 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-600/20">
          Sign in
        </button>
        <p className="text-center text-sm text-muted">
          No account?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-brand-700">
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}
