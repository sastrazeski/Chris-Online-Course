"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { throwReadableError } from "@/lib/errors";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const lessonVideoBucket = "lesson-videos";
const courseImageBucket = "course-images";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createCourse(formData: FormData) {
  const user = await requireAdmin();
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const title = String(formData.get("title"));
  const coverImageUrl = await uploadCourseImage(adminSupabase, formData.get("coverImage"));

  const { error } = await supabase.from("courses").insert({
    title,
    slug: slugify(String(formData.get("slug") || title)),
    description: String(formData.get("description")),
    cover_image_url: coverImageUrl,
    price: Number(formData.get("price")),
    currency: "IDR",
    is_published: formData.get("isPublished") === "on",
    created_by: user.id
  });

  if (error) throwReadableError(error, "Failed to create course.");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function createModule(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("modules").insert({
    course_id: String(formData.get("courseId")),
    title: String(formData.get("title")),
    position: Number(formData.get("position") || 0)
  });

  if (error) throwReadableError(error, "Failed to create module.");
  revalidatePath("/admin");
}

export async function createLesson(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const title = String(formData.get("title"));
  const { error } = await supabase.from("lessons").insert({
    module_id: String(formData.get("moduleId")),
    title,
    slug: slugify(String(formData.get("slug") || title)),
    description: String(formData.get("description") || "") || null,
    video_url: String(formData.get("videoUrl") || "") || null,
    duration_seconds: Number(formData.get("durationSeconds") || 0),
    position: Number(formData.get("position") || 0),
    is_preview: formData.get("isPreview") === "on"
  });

  if (error) throwReadableError(error, "Failed to create lesson.");
  revalidatePath("/admin");
}

export async function updateCourse(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const courseId = String(formData.get("courseId"));
  const title = String(formData.get("title"));
  const coverImageUrl = await uploadCourseImage(adminSupabase, formData.get("coverImage"), courseId);
  const updates = {
    title,
    slug: slugify(String(formData.get("slug") || title)),
    description: String(formData.get("description")),
    price: Number(formData.get("price")),
    is_published: formData.get("isPublished") === "on",
    ...(coverImageUrl ? { cover_image_url: coverImageUrl } : {})
  };

  const { error } = await supabase
    .from("courses")
    .update(updates)
    .eq("id", courseId);

  if (error) throwReadableError(error, "Failed to update course.");
  revalidatePath("/admin");
  revalidatePath("/courses");
}

async function uploadCourseImage(
  supabase: ReturnType<typeof createAdminClient>,
  image: FormDataEntryValue | null,
  courseId = "new"
) {
  if (!(image instanceof File) || image.size === 0) return null;

  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(image.type)) {
    throw new Error("Only JPG, PNG, WebP, or GIF images are supported.");
  }

  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = slugify(image.name.replace(/\.[^.]+$/, ""));
  const filePath = `${courseId}/${Date.now()}-${safeName}.${extension}`;

  const { data: bucket } = await supabase.storage.getBucket(courseImageBucket);
  if (!bucket) {
    const { error: bucketError } = await supabase.storage.createBucket(courseImageBucket, {
      public: true,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      fileSizeLimit: 10 * 1024 * 1024
    });

    if (bucketError) throwReadableError(bucketError, "Failed to create image storage bucket.");
  }

  const { error: uploadError } = await supabase.storage.from(courseImageBucket).upload(filePath, image, {
    contentType: image.type,
    upsert: true
  });

  if (uploadError) throwReadableError(uploadError, "Failed to upload course image.");

  const { data } = supabase.storage.from(courseImageBucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function updateLesson(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const lessonId = String(formData.get("lessonId"));
  const title = String(formData.get("title"));

  const { error } = await supabase
    .from("lessons")
    .update({
      title,
      slug: slugify(String(formData.get("slug") || title)),
      description: String(formData.get("description") || "") || null,
      video_url: String(formData.get("videoUrl") || "") || null,
      duration_seconds: Number(formData.get("durationSeconds") || 0),
      position: Number(formData.get("position") || 0),
      is_preview: formData.get("isPreview") === "on"
    })
    .eq("id", lessonId);

  if (error) throwReadableError(error, "Failed to update lesson.");
  revalidatePath("/admin");
}

export async function uploadLessonVideo(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const lessonId = String(formData.get("lessonId"));
  const video = formData.get("video");

  if (!(video instanceof File) || video.size === 0) {
    throw new Error("Choose an MP4 video before uploading.");
  }

  if (!["video/mp4", "video/webm", "video/ogg"].includes(video.type)) {
    throw new Error("Only MP4, WebM, or OGG videos are supported.");
  }

  const extension = video.name.split(".").pop()?.toLowerCase() || "mp4";
  const safeName = slugify(video.name.replace(/\.[^.]+$/, ""));
  const filePath = `${lessonId}/${Date.now()}-${safeName}.${extension}`;

  const { data: bucket } = await supabase.storage.getBucket(lessonVideoBucket);
  if (!bucket) {
    const { error: bucketError } = await supabase.storage.createBucket(lessonVideoBucket, {
      public: true,
      allowedMimeTypes: ["video/mp4", "video/webm", "video/ogg"],
      fileSizeLimit: 1024 * 1024 * 1024
    });

    if (bucketError) throwReadableError(bucketError, "Failed to create video storage bucket.");
  }

  const { error: uploadError } = await supabase.storage.from(lessonVideoBucket).upload(filePath, video, {
    contentType: video.type,
    upsert: true
  });

  if (uploadError) throwReadableError(uploadError, "Failed to upload video.");

  const { data } = supabase.storage.from(lessonVideoBucket).getPublicUrl(filePath);
  const { error } = await supabase.from("lessons").update({ video_url: data.publicUrl }).eq("id", lessonId);

  if (error) throwReadableError(error, "Failed to attach video to lesson.");
  revalidatePath("/admin");
}
