"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type SubscriptionPlanId = "monthly" | "yearly";

const plans = [
  {
    id: "monthly",
    title: "Monthly",
    price: "Rp99.000",
    period: "/ bulan",
    description: "Akses premium fleksibel untuk belajar setiap bulan."
  },
  {
    id: "yearly",
    title: "Yearly",
    price: "Rp799.000",
    period: "/ tahun",
    description: "Paket tahunan dengan hemat lebih besar untuk member aktif.",
    badge: "Best Value"
  }
] satisfies Array<{
  id: SubscriptionPlanId;
  title: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
}>;

export function SubscribeModal({
  isOpen,
  onClose,
  initialPlan = "monthly",
  midtransClientKey,
  midtransConfigured,
  snapScriptUrl
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: SubscriptionPlanId;
  midtransClientKey?: string;
  midtransConfigured: boolean;
  snapScriptUrl: string;
}) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>(initialPlan);
  const [message, setMessage] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialPlan);
      setMessage(null);
      setIsPaying(false);
      setRedirectUrl(null);
    }
  }, [initialPlan, isOpen]);

  if (!isOpen) return null;

  const activePlan = plans.find((plan) => plan.id === selectedPlan) ?? plans[0];

  async function loadSnapScript() {
    if (!midtransClientKey) return false;
    if (window.snap) return true;

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-midtrans-snap="true"]');
    if (existingScript) {
      return new Promise<boolean>((resolve) => {
        existingScript.addEventListener("load", () => resolve(Boolean(window.snap)), { once: true });
        existingScript.addEventListener("error", () => resolve(false), { once: true });
      });
    }

    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = snapScriptUrl;
      script.async = true;
      script.dataset.midtransSnap = "true";
      script.dataset.clientKey = midtransClientKey;
      script.addEventListener("load", () => resolve(Boolean(window.snap)), { once: true });
      script.addEventListener("error", () => resolve(false), { once: true });
      document.body.appendChild(script);
    });
  }

  async function startSubscriptionPayment() {
    if (!midtransConfigured) {
      setMessage("Midtrans belum dikonfigurasi. Isi MIDTRANS_SERVER_KEY dan MIDTRANS_CLIENT_KEY di environment.");
      return;
    }

    setIsPaying(true);
    setMessage(null);
    setRedirectUrl(null);

    try {
      const response = await fetch("/api/midtrans/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ plan: selectedPlan })
      });
      const payload = (await response.json()) as {
        error?: string;
        token?: string;
        redirectUrl?: string;
      };

      if (!response.ok || payload.error) {
        throw new Error(payload.error ?? "Gagal membuat transaksi subscription.");
      }

      if (!payload.token || !payload.redirectUrl) {
        throw new Error("Respons Midtrans tidak lengkap.");
      }

      setRedirectUrl(payload.redirectUrl);

      const scriptReady = await loadSnapScript();
      if (!scriptReady || !window.snap) {
        window.location.href = payload.redirectUrl;
        return;
      }

      window.snap.pay(payload.token, {
        onSuccess: () => {
          setMessage("Pembayaran berhasil. Status subscription akan aktif setelah notifikasi Midtrans diproses.");
          setIsPaying(false);
        },
        onPending: () => {
          setMessage("Pembayaran masih pending. Selesaikan instruksi pembayaran di Midtrans.");
          setIsPaying(false);
        },
        onError: () => {
          setMessage("Pembayaran gagal diproses. Silakan coba lagi.");
          setIsPaying(false);
        },
        onClose: () => {
          setMessage("Popup pembayaran ditutup sebelum transaksi selesai.");
          setIsPaying(false);
        }
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal memulai pembayaran subscription.");
      setIsPaying(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#07122D]/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#07122D] dark:text-white">Subscribe untuk Unlock Semua Video</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Dapatkan akses penuh ke semua kelas premium, materi eksklusif, mentor session, dan benefit lainnya.
            </p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 hover:text-[#FF304F] dark:bg-white/10 dark:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              badge={plan.badge}
              isSelected={selectedPlan === plan.id}
              onSelect={() => {
                setSelectedPlan(plan.id);
                setMessage(null);
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={startSubscriptionPayment}
          disabled={isPaying}
          className="mt-6 h-12 w-full rounded-2xl bg-[#FF304F] text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPaying ? "Membuka Midtrans..." : `Subscribe Sekarang - ${activePlan.title}`}
        </button>
        {message ? <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#07122D] dark:bg-red-500/10 dark:text-white">{message}</p> : null}
        {redirectUrl ? (
          <a className="mt-3 inline-flex text-sm font-black text-[#FF304F] hover:text-red-600" href={redirectUrl}>
            Buka halaman pembayaran Midtrans
          </a>
        ) : null}
      </div>
    </div>
  );
}

type SnapCallbacks = {
  onSuccess?: (result: Record<string, unknown>) => void;
  onPending?: (result: Record<string, unknown>) => void;
  onError?: (result: Record<string, unknown>) => void;
  onClose?: () => void;
};

declare global {
  interface Window {
    snap?: {
      pay: (token: string, callbacks?: SnapCallbacks) => void;
    };
  }
}

function PlanCard({
  title,
  price,
  period,
  description,
  badge,
  isSelected,
  onSelect
}: {
  title: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        "relative min-h-36 rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-red-500/15 dark:border-white/10",
        isSelected ? "border-[#FF304F] bg-red-50/70 shadow-lg shadow-red-500/10 dark:bg-red-500/10" : "border-slate-200 hover:border-[#FF304F]/50 hover:bg-slate-50 dark:hover:bg-white/5"
      )}
    >
      {badge ? <span className="absolute right-4 top-4 rounded-full bg-red-50 px-2 py-1 text-xs font-black text-[#FF304F] dark:bg-red-500/10">{badge}</span> : null}
      <span className="flex items-center gap-2 pr-20 font-black text-[#07122D] dark:text-white">
        {isSelected ? (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FF304F] text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : null}
        {title}
      </span>
      <p className="mt-4 text-2xl font-black text-[#07122D] dark:text-white">
        {price} <span className="text-sm font-semibold text-slate-500">{period}</span>
      </p>
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-300">{description}</p>
    </button>
  );
}
