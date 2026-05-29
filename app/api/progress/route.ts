import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = (await request.json()) as {
    lessonId?: string;
    isCompleted?: boolean;
    watchedSeconds?: number;
  };

  if (!body.lessonId) {
    return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: body.lessonId,
      is_completed: Boolean(body.isCompleted),
      watched_seconds: body.watchedSeconds ?? 0,
      updated_at: new Date().toISOString()
    },
    {
      onConflict: "user_id,lesson_id"
    }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
