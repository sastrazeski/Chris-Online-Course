import Link from "next/link";
import { signUp } from "../actions";

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <form action={signUp} className="w-full max-w-md space-y-5 rounded-lg border border-line bg-white p-6 shadow-panel">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Create account</h1>
          <p className="mt-2 text-sm text-muted">Buy courses and save progress across lessons.</p>
        </div>
        {params.error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
        <label className="block text-sm font-medium text-ink">
          Full name
          <input name="fullName" required className="mt-2 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input name="email" type="email" required className="mt-2 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Password
          <input name="password" type="password" required minLength={8} className="mt-2 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" />
        </label>
        <button className="h-11 w-full rounded-md bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">
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
