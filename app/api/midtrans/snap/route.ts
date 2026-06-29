import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildSnapPayload, createSnapTransaction } from "@/lib/midtrans";
import { toErrorMessage } from "@/lib/errors";

type SnapCheckoutRequest = {
  courseId?: string;
};

export async function POST(request: Request) {
  const { courseId } = (await request.json().catch(() => ({}))) as SnapCheckoutRequest;

  if (!courseId) {
    return NextResponse.json({ error: "Course ID wajib diisi." }, { status: 400 });
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

  const { data: course } = await supabase
    .from("courses")
    .select("id, title, slug, price, currency")
    .eq("id", courseId)
    .eq("is_published", true)
    .single();

  if (!course) {
    return NextResponse.json({ error: "Course tidak ditemukan." }, { status: 404 });
  }

  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", course.id)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (enrollment) {
    return NextResponse.json({
      enrolled: true,
      courseUrl: `/courses/${course.slug}`
    });
  }

  const midtransOrderId = `COURSE-${course.id.slice(0, 8)}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const { error: orderError } = await supabase.from("orders").insert({
    user_id: user.id,
    course_id: course.id,
    amount: course.price,
    currency: course.currency,
    midtrans_order_id: midtransOrderId
  });

  if (orderError) {
    return NextResponse.json({ error: toErrorMessage(orderError, "Gagal membuat order pembayaran.") }, { status: 500 });
  }

  let transaction: Awaited<ReturnType<typeof createSnapTransaction>>;
  try {
    transaction = await createSnapTransaction(
      buildSnapPayload({
        orderId: midtransOrderId,
        amount: course.price,
        courseId: course.id,
        courseTitle: course.title,
        userEmail: user.email,
        userName: user.user_metadata.full_name,
        finishPath: `/courses/${course.slug}`
      })
    );
  } catch (error) {
    return NextResponse.json({ error: toErrorMessage(error, "Gagal membuat transaksi Midtrans.") }, { status: 502 });
  }

  return NextResponse.json({
    orderId: midtransOrderId,
    token: transaction.token,
    redirectUrl: transaction.redirect_url,
    courseUrl: `/courses/${course.slug}`
  });
}
