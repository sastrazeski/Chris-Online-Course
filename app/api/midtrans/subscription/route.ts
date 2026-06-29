import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createSnapTransaction } from "@/lib/midtrans";
import { toErrorMessage } from "@/lib/errors";
import { absoluteUrl } from "@/lib/utils";

const subscriptionPlans = {
  monthly: {
    title: "Red and Blue Monthly Subscription",
    amount: 99000,
    period: "bulan"
  },
  yearly: {
    title: "Red and Blue Yearly Subscription",
    amount: 799000,
    period: "tahun"
  }
} as const;

type SubscriptionPlanId = keyof typeof subscriptionPlans;

type SubscriptionRequest = {
  plan?: string;
};

function isSubscriptionPlan(plan: string | undefined): plan is SubscriptionPlanId {
  return plan === "monthly" || plan === "yearly";
}

export async function POST(request: Request) {
  const { plan } = (await request.json().catch(() => ({}))) as SubscriptionRequest;

  if (!isSubscriptionPlan(plan)) {
    return NextResponse.json({ error: "Paket subscription tidak valid." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Silakan login untuk melanjutkan pembayaran." }, { status: 401 });
  }

  if (!user.email_confirmed_at) {
    return NextResponse.json({ error: "Verifikasi email dulu sebelum melakukan pembayaran." }, { status: 403 });
  }

  const selectedPlan = subscriptionPlans[plan];
  const midtransOrderId = `SUB-${plan.toUpperCase()}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

  let transaction: Awaited<ReturnType<typeof createSnapTransaction>>;
  try {
    transaction = await createSnapTransaction({
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: selectedPlan.amount
      },
      customer_details: {
        email: user.email,
        first_name: user.user_metadata.full_name
      },
      item_details: [
        {
          id: `subscription-${plan}`,
          price: selectedPlan.amount,
          quantity: 1,
          name: selectedPlan.title
        }
      ],
      callbacks: {
        finish: absoluteUrl("/dashboard/billing")
      }
    });
  } catch (error) {
    return NextResponse.json({ error: toErrorMessage(error, "Gagal membuat transaksi Midtrans.") }, { status: 502 });
  }

  return NextResponse.json({
    orderId: midtransOrderId,
    token: transaction.token,
    redirectUrl: transaction.redirect_url,
    plan,
    amount: selectedPlan.amount,
    period: selectedPlan.period
  });
}
