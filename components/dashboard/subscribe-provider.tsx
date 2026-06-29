"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { SubscribeModal, type SubscriptionPlanId } from "./subscribe-modal";
import { cn } from "@/lib/utils";

type SubscribeContextValue = {
  openSubscribe: (plan?: SubscriptionPlanId) => void;
};

const SubscribeContext = createContext<SubscribeContextValue | null>(null);

export function SubscribeProvider({
  children,
  midtransClientKey,
  snapScriptUrl,
  midtransConfigured
}: {
  children: React.ReactNode;
  midtransClientKey?: string;
  snapScriptUrl: string;
  midtransConfigured: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>("monthly");

  const value = useMemo(
    () => ({
      openSubscribe: (plan: SubscriptionPlanId = "monthly") => {
        setSelectedPlan(plan);
        setIsOpen(true);
      }
    }),
    []
  );

  return (
    <SubscribeContext.Provider value={value}>
      {children}
      <SubscribeModal
        isOpen={isOpen}
        initialPlan={selectedPlan}
        midtransClientKey={midtransClientKey}
        midtransConfigured={midtransConfigured}
        snapScriptUrl={snapScriptUrl}
        onClose={() => setIsOpen(false)}
      />
    </SubscribeContext.Provider>
  );
}

export function useSubscribeModal() {
  const context = useContext(SubscribeContext);

  if (!context) {
    throw new Error("useSubscribeModal must be used inside SubscribeProvider");
  }

  return context;
}

export function SubscribeButton({
  children,
  className,
  plan = "monthly"
}: {
  children: React.ReactNode;
  className?: string;
  plan?: SubscriptionPlanId;
}) {
  const { openSubscribe } = useSubscribeModal();

  return (
    <button type="button" onClick={() => openSubscribe(plan)} className={cn("transition", className)}>
      {children}
    </button>
  );
}
