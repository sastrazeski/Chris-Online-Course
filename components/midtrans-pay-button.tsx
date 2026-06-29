"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type MidtransPayButtonProps = {
  courseId: string;
  clientKey?: string;
  snapScriptUrl: string;
  disabled?: boolean;
};

type SnapCheckoutResponse = {
  error?: string;
  enrolled?: boolean;
  courseUrl?: string;
  token?: string;
  redirectUrl?: string;
};

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

export function MidtransPayButton({ courseId, clientKey, snapScriptUrl, disabled }: MidtransPayButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  async function loadSnapScript() {
    if (!clientKey) return false;
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
      script.dataset.clientKey = clientKey;
      script.addEventListener("load", () => resolve(Boolean(window.snap)), { once: true });
      script.addEventListener("error", () => resolve(false), { once: true });
      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    setIsLoading(true);
    setMessage(null);
    setRedirectUrl(null);

    try {
      const response = await fetch("/api/midtrans/snap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ courseId })
      });
      const payload = (await response.json()) as SnapCheckoutResponse;

      if (!response.ok || payload.error) {
        throw new Error(payload.error ?? "Gagal membuat transaksi Midtrans.");
      }

      if (payload.enrolled && payload.courseUrl) {
        router.push(payload.courseUrl);
        return;
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
          setMessage("Pembayaran berhasil. Akses course akan aktif setelah notifikasi Midtrans diproses.");
          router.push(payload.courseUrl ?? "/dashboard/my-learning");
          router.refresh();
        },
        onPending: () => {
          setMessage("Pembayaran masih pending. Selesaikan instruksi pembayaran di Midtrans.");
          setIsLoading(false);
        },
        onError: () => {
          setMessage("Pembayaran gagal diproses. Silakan coba lagi.");
          setIsLoading(false);
        },
        onClose: () => {
          setMessage("Popup pembayaran ditutup sebelum transaksi selesai.");
          setIsLoading(false);
        }
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal memulai pembayaran.");
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button type="button" className="w-full" disabled={disabled || isLoading} onClick={handlePayment}>
        {isLoading ? "Memproses..." : "Bayar dengan Midtrans"}
      </Button>
      {message ? <p className="text-sm leading-6 text-muted">{message}</p> : null}
      {redirectUrl ? (
        <a className="inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800" href={redirectUrl}>
          Buka halaman pembayaran Midtrans
        </a>
      ) : null}
    </div>
  );
}
