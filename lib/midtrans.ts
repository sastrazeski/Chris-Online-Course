import crypto from "crypto";
import { absoluteUrl } from "./utils";

const sandboxBase = "https://app.sandbox.midtrans.com/snap/v1/transactions";
const productionBase = "https://app.midtrans.com/snap/v1/transactions";

export type SnapTransactionPayload = {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    email?: string;
    first_name?: string;
  };
  item_details: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  callbacks: {
    finish: string;
  };
};

export async function createSnapTransaction(payload: SnapTransactionPayload) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    throw new Error("MIDTRANS_SERVER_KEY is not configured");
  }

  const endpoint = process.env.MIDTRANS_IS_PRODUCTION === "true" ? productionBase : sandboxBase;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Midtrans transaction failed: ${text}`);
  }

  return response.json() as Promise<{ token: string; redirect_url: string }>;
}

export function buildSnapPayload({
  orderId,
  amount,
  courseId,
  courseTitle,
  userEmail,
  userName
}: {
  orderId: string;
  amount: number;
  courseId: string;
  courseTitle: string;
  userEmail?: string;
  userName?: string;
}): SnapTransactionPayload {
  return {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount
    },
    customer_details: {
      email: userEmail,
      first_name: userName
    },
    item_details: [
      {
        id: courseId,
        price: amount,
        quantity: 1,
        name: courseTitle.slice(0, 50)
      }
    ],
    callbacks: {
      finish: absoluteUrl("/dashboard")
    }
  };
}

export function verifyMidtransSignature({
  orderId,
  statusCode,
  grossAmount,
  signatureKey
}: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return false;

  const hash = crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest("hex");

  return hash === signatureKey;
}

export function mapMidtransStatus(transactionStatus: string, fraudStatus?: string) {
  if (transactionStatus === "capture") {
    return fraudStatus === "challenge" ? "pending" : "paid";
  }

  if (transactionStatus === "settlement") return "paid";
  if (transactionStatus === "pending") return "pending";
  if (transactionStatus === "expire") return "expired";
  if (transactionStatus === "cancel") return "cancelled";
  return "failed";
}
