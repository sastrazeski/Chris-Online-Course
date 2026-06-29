"use server";

import { revalidatePath } from "next/cache";
import { requireDeveloper } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UserRole } from "@/lib/supabase/types";

const allowedRoles: UserRole[] = ["student", "teacher", "instructor", "admin", "developer"];

export async function updateUserRole(formData: FormData) {
  const developer = await requireDeveloper();
  const userId = String(formData.get("userId"));
  const role = String(formData.get("role")) as UserRole;

  if (!allowedRoles.includes(role)) {
    throw new Error("Role tidak valid.");
  }

  if (developer.id === userId && role !== "developer") {
    throw new Error("Akun developer aktif tidak bisa menurunkan role sendiri.");
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/developer");
  revalidatePath("/account");
  revalidatePath("/dashboard");
}
