import { Shield, Users } from "lucide-react";
import { updateUserRole } from "./actions";
import { requireDeveloper } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UserRole } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: "student", label: "Siswa" },
  { value: "teacher", label: "Pengajar" },
  { value: "admin", label: "Admin" },
  { value: "developer", label: "Developer" }
];

export default async function DeveloperPage() {
  await requireDeveloper();
  const supabase = createAdminClient();
  const [{ data: profiles }, authUsers] = await Promise.all([
    supabase.from("profiles").select("id, full_name, role, created_at").order("created_at", { ascending: false }),
    supabase.auth.admin.listUsers()
  ]);

  const usersById = new Map((authUsers.data.users ?? []).map((user) => [user.id, user]));
  const rows = (profiles ?? []).map((profile) => ({
    ...profile,
    email: usersById.get(profile.id)?.email ?? "-"
  }));
  const totals = roleOptions.map((role) => ({
    ...role,
    count: rows.filter((row) => row.role === role.value).length
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Developer</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink dark:text-slate-100">Monitoring user</h1>
          <p className="mt-2 text-muted">Pantau jumlah pengguna dan ubah status akun.</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-4 text-right shadow-panel dark:border-white/10 dark:bg-white/5">
          <p className="text-sm text-muted">Total user</p>
          <p className="mt-1 text-3xl font-semibold text-ink dark:text-slate-100">{rows.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {totals.map((item) => (
          <div key={item.value} className="rounded-lg border border-line bg-white p-5 shadow-panel dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-red-50 text-red-500 dark:bg-red-500/10">
                {item.value === "student" ? <Users className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-muted dark:bg-white/10">{item.label}</span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-ink dark:text-slate-100">{item.count}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-line bg-white shadow-panel dark:border-white/10 dark:bg-white/5">
        <div className="border-b border-line px-5 py-4 dark:border-white/10">
          <h2 className="font-semibold text-ink dark:text-slate-100">Daftar user</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-muted dark:bg-white/5">
              <tr>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Bergabung</th>
                <th className="px-5 py-3">Ubah status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line dark:divide-white/10">
              {rows.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-4 font-semibold text-ink dark:text-slate-100">{user.full_name || "Tanpa nama"}</td>
                  <td className="px-5 py-4 text-muted">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold capitalize text-red-600 dark:bg-red-500/10">
                      {formatRole(user.role)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">{new Date(user.created_at).toLocaleDateString("id-ID")}</td>
                  <td className="px-5 py-4">
                    <form action={updateUserRole} className="flex items-center gap-2">
                      <input type="hidden" name="userId" value={user.id} />
                      <select
                        name="role"
                        defaultValue={user.role}
                        className="h-10 rounded-md border border-line bg-white px-3 text-sm font-semibold outline-none transition focus:border-red-500 dark:border-white/15 dark:bg-slate-900 dark:text-slate-100"
                      >
                        {roleOptions.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                      <button className="h-10 rounded-md bg-red-500 px-4 text-sm font-semibold text-white transition hover:bg-red-600">
                        Simpan
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-muted">
                    Belum ada user.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function formatRole(role: UserRole) {
  const labels: Record<UserRole, string> = {
    student: "Siswa",
    teacher: "Pengajar",
    admin: "Admin",
    developer: "Developer"
  };

  return labels[role];
}
