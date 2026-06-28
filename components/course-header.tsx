import Link from "next/link";
import { BookOpen, LayoutDashboard } from "lucide-react";
import { AccountNav } from "./account-nav";
import { NavBackButton } from "./nav-back-button";

export function CourseHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <NavBackButton />
        <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
          <Link href="/courses" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-slate-700 transition hover:bg-gray-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
            <BookOpen className="h-4 w-4" />
            Courses
          </Link>
          <Link href="/dashboard" className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-slate-700 transition hover:bg-gray-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
        <AccountNav />
      </div>
    </header>
  );
}
