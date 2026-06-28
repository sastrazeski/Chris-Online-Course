"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CompanyLogo } from "./company-logo";
import { NavBackButton } from "./nav-back-button";

export function HeaderHomeControl() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Link href="/" className="text-ink dark:text-slate-100" aria-label="Red and Blue home">
        <CompanyLogo />
      </Link>
    );
  }

  return <NavBackButton />;
}
