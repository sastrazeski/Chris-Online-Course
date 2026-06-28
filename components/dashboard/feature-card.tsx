import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FeatureCard({
  title,
  description,
  action,
  href,
  icon: Icon,
  variant
}: {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  variant: "navy" | "red";
}) {
  return (
    <article
      className={cn(
        "rounded-3xl p-6 text-white shadow-xl",
        variant === "red" ? "bg-[#FF304F] shadow-red-500/20" : "bg-[#07122D] shadow-slate-900/20"
      )}
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-6 text-xl font-black">{title}</h2>
      <p className="mt-3 min-h-14 text-sm leading-6 text-white/78">{description}</p>
      <Link href={href} className="mt-6 inline-flex h-10 items-center rounded-xl bg-white px-4 text-sm font-black text-[#07122D]">
        {action}
      </Link>
    </article>
  );
}
