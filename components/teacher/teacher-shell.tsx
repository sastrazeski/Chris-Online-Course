"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  DollarSign,
  FileBarChart,
  FolderOpen,
  GraduationCap,
  Home,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Tag,
  Upload,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarGroups = [
  {
    label: "Dashboard Pengajar",
    items: [{ label: "Dashboard", href: "/teacher/dashboard", icon: Home }]
  },
  {
    label: "Kelola Konten",
    items: [
      { label: "Kelas Saya", href: "/teacher/courses", icon: BookOpen },
      { label: "Konten", href: "/teacher/content", icon: FolderOpen },
      { label: "Kategori", href: "/teacher/categories", icon: Tag },
      { label: "Kuiz & Tugas", href: "/teacher/assignments", icon: ClipboardCheck },
      { label: "Sertifikat", href: "/teacher/certificates", icon: Award }
    ]
  },
  {
    label: "Kelola Siswa",
    items: [
      { label: "Siswa", href: "/teacher/students", icon: Users },
      { label: "Komentar & Review", href: "/teacher/reviews", icon: MessageSquare },
      { label: "Diskusi", href: "/teacher/discussions", icon: ShieldCheck }
    ]
  },
  {
    label: "Analytics",
    items: [
      { label: "Analytics", href: "/teacher/analytics", icon: BarChart3 },
      { label: "Laporan", href: "/teacher/reports", icon: FileBarChart },
      { label: "Pendapatan", href: "/teacher/revenue", icon: DollarSign }
    ]
  },
  {
    label: "Pengaturan",
    items: [
      { label: "Pengaturan Profil", href: "/teacher/profile-settings", icon: Settings },
      { label: "Pengaturan Akun", href: "/teacher/account-settings", icon: Settings }
    ]
  }
] as const;

export function TeacherShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F6F8FC] text-[#07122D]">
      <div className="grid min-h-screen lg:grid-cols-[292px_1fr]">
        <TeacherSidebar />
        <section className="min-w-0">
          <TeacherTopbar />
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-3">
        <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[#07122D] text-sm font-black text-white shadow-lg shadow-slate-900/15">
          RB
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#FF304F]" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-black uppercase tracking-[0.16em]">Red and Blue</span>
          <span className="text-xs font-semibold text-slate-500">Creative Academy</span>
        </span>
      </Link>

      <nav className="mt-8 space-y-5">
        {sidebarGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[11px] font-black uppercase tracking-wide text-slate-400">{group.label}</p>
            <div className="mt-2 space-y-1">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition",
                      active
                        ? "bg-[#07122D] text-white shadow-lg shadow-slate-900/15"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#07122D]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl bg-[#07122D] p-5 text-white shadow-2xl shadow-slate-900/20">
        <GraduationCap className="h-6 w-6 text-[#FF304F]" />
        <h2 className="mt-4 font-black">Mode Pengajar Aktif</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Kelola kelas, upload konten, pantau performa siswa, dan lihat analytics pembelajaran.
        </p>
        <Link
          href="/teacher/courses"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/25 text-sm font-black text-white transition hover:bg-white/10"
        >
          Kelola Kelas Saya
        </Link>
      </div>
    </aside>
  );
}

function TeacherTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <label className="relative min-w-0 flex-1 lg:max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#FF304F] focus:bg-white focus:ring-4 focus:ring-red-500/10"
            placeholder="Cari kelas, siswa, materi, atau topik..."
          />
        </label>
        <Link
          href="/teacher/courses"
          className="hidden h-11 items-center gap-2 rounded-xl bg-[#07122D] px-5 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-900 sm:inline-flex"
        >
          <Plus className="h-4 w-4" />
          Buat Kelas Baru
        </Link>
        <button className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#FF304F] hover:text-[#FF304F]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-[#FF304F] text-[10px] font-black text-white">5</span>
        </button>
        <button className="hidden items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-50 md:flex">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#07122D] text-sm font-black text-white">HD</span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-black">Hendra Darmawan</span>
            <span className="text-xs font-semibold text-slate-500">Pengajar</span>
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
        <Link href="/teacher/content/upload" className="grid h-11 w-11 place-items-center rounded-xl bg-[#FF304F] text-white shadow-lg shadow-red-500/20 lg:hidden">
          <Upload className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
