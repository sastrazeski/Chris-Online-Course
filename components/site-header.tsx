import Link from "next/link";
import { AccountNav } from "@/components/account-nav";
import { CompanyLogo } from "./company-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="text-ink dark:text-slate-100" aria-label="Red and Blue home">
          <CompanyLogo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-black lg:flex">
          {[
            ["Home", "/#home"],
            ["About Us", "/#about"],
            ["Services", "/#services"],
            ["Portfolio", "/#portfolio"],
            ["Blog", "/#blog"],
            ["Contact", "/#contact"]
          ].map(([label, href], index) => (
            <Link
              key={label}
              href={href}
              className={`relative text-[#07122D] transition hover:text-[#FF304F] dark:text-slate-200 ${
                index === 0 ? "text-[#FF304F] after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:w-full after:bg-[#FF304F]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AccountNav />
        </div>
      </div>
    </header>
  );
}
