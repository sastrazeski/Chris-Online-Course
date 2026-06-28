"use client";

import Link from "next/link";
import { Award, BookOpen, CalendarClock, CreditCard, Heart, Home, Settings, ShoppingBag, Sparkles, Users, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Online Course", href: "/dashboard/online-course", icon: BookOpen },
  { label: "Jasa Kreatif", href: "/dashboard/creative-services", icon: Video },
  { label: "E-Commerce Services", href: "/dashboard/ecommerce-services", icon: ShoppingBag },
  { label: "My Learning", href: "/dashboard/my-learning", icon: Sparkles },
  { label: "Favorite", href: "/dashboard/favorite", icon: Heart },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Community", href: "/dashboard/community", icon: Users },
  { label: "Mentor Session", href: "/dashboard/mentor-session", icon: CalendarClock },
  { label: "Billing & Subscription", href: "/dashboard/billing", icon: CreditCard },
  { label: "Pengaturan Akun", href: "/settings", icon: Settings }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white p-5 lg:sticky lg:top-0 lg:flex lg:flex-col dark:border-white/10 dark:bg-slate-950">
      <Link href="/" className="flex items-center gap-3 px-2 text-[#07122D] dark:text-white">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#07122D] text-sm font-black text-white shadow-lg shadow-slate-900/20">
          RB
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-black uppercase tracking-[0.16em]">Red and Blue</span>
          <span className="text-xs font-semibold text-slate-500">Creative Agency</span>
        </span>
      </Link>

      <nav className="mt-8 space-y-1">
        {menuItems.map(({ label, href, icon: Icon }) => {
          const isActive = isActivePath(pathname, href);

          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition",
                isActive
                  ? "bg-[#07122D] text-white shadow-lg shadow-slate-900/15"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#07122D] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-red-100 bg-red-50 p-4 text-[#07122D] shadow-sm dark:border-red-500/10 dark:bg-red-500/10 dark:text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#FF304F]" />
          <h2 className="font-black">Upgrade ke Premium</h2>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
          Akses semua kursus, materi premium, template eksklusif, dan benefit lainnya.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <li>Akses semua kelas premium</li>
          <li>Materi eksklusif</li>
          <li>Sesi mentor group</li>
          <li>Sertifikat kelulusan</li>
        </ul>
        <Link href="/dashboard/billing" className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#FF304F] px-4 text-sm font-bold text-white shadow-lg shadow-red-500/20">
          Upgrade Sekarang
        </Link>
      </div>
    </aside>
  );
}

export function DashboardMobileNav() {
  const pathname = usePathname();
  const mobileItems = menuItems.slice(0, 5);

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-5 gap-1 rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur lg:hidden dark:border-white/10 dark:bg-slate-950/95">
      {mobileItems.map(({ label, href, icon: Icon }) => {
        const isActive = isActivePath(pathname, href);

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "grid h-12 place-items-center rounded-2xl text-[10px] font-bold transition",
              isActive ? "bg-[#07122D] text-white" : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            )}
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </Link>
        );
      })}
    </nav>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
