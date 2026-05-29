export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function isMidtransConfigured() {
  return Boolean(process.env.MIDTRANS_SERVER_KEY);
}
