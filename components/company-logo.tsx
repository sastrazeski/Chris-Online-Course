type CompanyLogoProps = {
  compact?: boolean;
};

export function CompanyLogo({ compact = false }: CompanyLogoProps) {
  return (
    <span className="flex items-center gap-3">
      <svg
        aria-hidden="true"
        viewBox="0 0 128 128"
        className={compact ? "h-11 w-11 shrink-0" : "h-14 w-14 shrink-0"}
        fill="none"
      >
        <circle
          cx="58"
          cy="68"
          r="42"
          stroke="#E1123C"
          strokeWidth="8"
          strokeDasharray="205 42"
          strokeDashoffset="22"
          strokeLinecap="round"
        />
        <circle
          cx="58"
          cy="68"
          r="25"
          stroke="#E1123C"
          strokeWidth="7"
          strokeDasharray="122 36"
          strokeDashoffset="14"
          strokeLinecap="round"
        />
        <path d="M69 57L94 32" stroke="#111C72" strokeWidth="10" strokeLinecap="round" />
        <circle cx="100" cy="26" r="18" fill="white" stroke="#111C72" strokeWidth="9" />
        <circle cx="58" cy="68" r="17" fill="white" stroke="#111C72" strokeWidth="9" />
        <circle cx="41" cy="69" r="8" fill="white" stroke="#111C72" strokeWidth="7" />
        <circle cx="59" cy="86" r="9" fill="white" stroke="#111C72" strokeWidth="7" />
      </svg>
      <span className="leading-none">
        <span className="block text-[13px] font-black uppercase tracking-[0.14em] text-slate-950 dark:text-slate-100">
          Red and Blue
        </span>
        {!compact ? (
          <span className="mt-1 block text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
            Creative Agency
          </span>
        ) : null}
      </span>
    </span>
  );
}
