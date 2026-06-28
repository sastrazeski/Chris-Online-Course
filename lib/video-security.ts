import { createAdminClient } from "./supabase/admin";

const protectedVideoPrefix = "supabase://";
const signedUrlTtlSeconds = 10 * 60;

export async function getPlayableVideoUrl(videoUrl: string | null) {
  if (!videoUrl) return null;

  if (!videoUrl.startsWith(protectedVideoPrefix)) {
    return videoUrl;
  }

  const parsed = parseProtectedVideoUrl(videoUrl);
  if (!parsed) return null;

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage.from(parsed.bucket).createSignedUrl(parsed.path, signedUrlTtlSeconds);

  if (error) {
    throw new Error(`Failed to create protected video URL: ${error.message}`);
  }

  return data.signedUrl;
}

export function createProtectedVideoUrl(bucket: string, path: string) {
  return `${protectedVideoPrefix}${bucket}/${path}`;
}

function parseProtectedVideoUrl(value: string) {
  const withoutPrefix = value.slice(protectedVideoPrefix.length);
  const separatorIndex = withoutPrefix.indexOf("/");

  if (separatorIndex <= 0) return null;

  return {
    bucket: withoutPrefix.slice(0, separatorIndex),
    path: withoutPrefix.slice(separatorIndex + 1)
  };
}
