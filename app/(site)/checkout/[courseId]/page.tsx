import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { throwReadableError } from "@/lib/errors";
import { createSnapTransaction, buildSnapPayload } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";
import { LinkButton } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const user = await requireUser();
  const supabase = await createClient();

  const { data: course } = await supabase.from("courses").select("*").eq("id", courseId).eq("is_published", true).single();
  if (!course) redirect("/courses");

  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", course.id)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (enrollment) redirect(`/courses/${course.slug}`);

  const midtransOrderId = `COURSE-${course.id.slice(0, 8)}-${Date.now()}`;
  const { error } = await supabase.from("orders").insert({
    user_id: user.id,
    course_id: course.id,
    amount: course.price,
    currency: course.currency,
    midtrans_order_id: midtransOrderId
  });

  if (error) {
    throwReadableError(error, "Failed to create order.");
  }

  const transaction = await createSnapTransaction(
    buildSnapPayload({
      orderId: midtransOrderId,
      amount: course.price,
      courseId: course.id,
      courseTitle: course.title,
      userEmail: user.email,
      userName: user.user_metadata.full_name
    })
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-lg border border-line bg-white p-6 shadow-panel">
        <h1 className="text-2xl font-semibold text-ink">Checkout</h1>
        <p className="mt-2 text-muted">Complete payment in Midtrans to unlock this course.</p>
        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <h2 className="font-semibold text-ink">{course.title}</h2>
          <p className="mt-1 text-sm text-muted">Order: {midtransOrderId}</p>
          <p className="mt-3 text-xl font-semibold text-ink">{formatPrice(course.price, course.currency)}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={transaction.redirect_url}>Pay with Midtrans</LinkButton>
          <LinkButton href={`/courses/${course.slug}`} variant="secondary">
            Back to course
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
