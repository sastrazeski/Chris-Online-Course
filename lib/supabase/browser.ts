"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicKey, getSupabaseUrl } from "../env";
import type { Database } from "./types";

export function createClient() {
  return createBrowserClient<Database>(
    getSupabaseUrl()!,
    getSupabasePublicKey()!
  );
}
