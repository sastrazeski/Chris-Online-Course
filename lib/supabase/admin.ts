import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as ReturnType<typeof createClient<any>>;
}
