import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getMidtransClientKey, isMidtransConfigured } from "@/lib/env";
import { getSnapScriptUrl } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";
import { LinkButton } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { MidtransPayButton } from "@/components/midtrans-pay-button";

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

  const midtransConfigured = isMidtransConfigured();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-lg border border-line bg-white p-6 shadow-panel">
        <h1 className="text-2xl font-semibold text-ink">Checkout</h1>
        <p className="mt-2 text-muted">Selesaikan pembayaran via Midtrans untuk membuka akses course ini.</p>
        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <h2 className="font-semibold text-ink">{course.title}</h2>
          <p className="mt-3 text-xl font-semibold text-ink">{formatPrice(course.price, course.currency)}</p>
        </div>
        {!midtransConfigured ? (
          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Midtrans belum dikonfigurasi. Isi MIDTRANS_SERVER_KEY dan MIDTRANS_CLIENT_KEY di environment.
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="w-full sm:w-auto sm:min-w-56">
            <MidtransPayButton
              courseId={course.id}
              clientKey={getMidtransClientKey()}
              snapScriptUrl={getSnapScriptUrl()}
              disabled={!midtransConfigured}
            />
          </div>
          <LinkButton href={`/courses/${course.slug}`} variant="secondary">
            Back to course
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
