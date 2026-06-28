"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type NavBackButtonProps = {
  fallbackHref?: string;
};

export function NavBackButton({ fallbackHref = "/" }: NavBackButtonProps) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-red-500/15 bg-red-50 px-4 text-sm font-semibold text-red-600 shadow-sm shadow-red-500/5 transition hover:border-red-500/35 hover:bg-red-100 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/15"
    >
      <ArrowLeft className="h-4 w-4" />
      Kembali
    </button>
  );
}
