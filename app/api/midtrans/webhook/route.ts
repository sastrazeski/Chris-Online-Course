import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapMidtransStatus, verifyMidtransSignature } from "@/lib/midtrans";

type MidtransNotification = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  fraud_status?: string;
  transaction_id?: string;
  payment_type?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as MidtransNotification;

  const valid = verifyMidtransSignature({
    orderId: payload.order_id,
    statusCode: payload.status_code,
    grossAmount: payload.gross_amount,
    signatureKey: payload.signature_key
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const status = mapMidtransStatus(payload.transaction_status, payload.fraud_status);

  const { data: order, error } = await supabase
    .from("orders")
    .update({
      status,
      midtrans_transaction_id: payload.transaction_id ?? null,
      payment_type: payload.payment_type ?? null,
      raw_notification: payload
    })
    .eq("midtrans_order_id", payload.order_id)
    .select("*")
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (status === "paid") {
    await supabase.from("enrollments").upsert(
      {
        user_id: order.user_id,
        course_id: order.course_id,
        status: "active"
      },
      {
        onConflict: "user_id,course_id"
      }
    );
  }

  return NextResponse.json({ received: true });
}
