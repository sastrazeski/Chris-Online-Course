import Link from "next/link";
import { signIn } from "../actions";

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <form action={signIn} className="w-full max-w-md space-y-5 rounded-lg border border-line bg-white p-6 shadow-panel">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-muted">Access your courses and continue learning.</p>
        </div>
        {params.error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
        <input type="hidden" name="next" value={params.next ?? "/dashboard"} />
        <label className="block text-sm font-medium text-ink">
          Email
          <input name="email" type="email" required className="mt-2 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Password
          <input name="password" type="password" required className="mt-2 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600" />
        </label>
        <button className="h-11 w-full rounded-md bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">
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
