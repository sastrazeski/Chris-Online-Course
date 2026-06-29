import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabasePublicKey, getSupabaseUrl, isSupabaseConfigured } from "./lib/env";
import type { Database } from "./lib/supabase/types";

const protectedPrefixes = ["/dashboard", "/teacher", "/learn", "/admin", "/checkout", "/account", "/settings", "/developer"];

export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({
    request
  });
  type CookieToSet = {
    name: string;
    value: string;
    options?: Parameters<typeof response.cookies.set>[2];
  };

  const supabase = createServerClient<Database>(
    getSupabaseUrl()!,
    getSupabasePublicKey()!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isProtectedRoute = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));
  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isProtectedRoute && user && !user.email_confirmed_at) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth/verify";
    if (user.email) {
      redirectUrl.searchParams.set("email", user.email);
    }
    redirectUrl.searchParams.set("message", "Verifikasi email dulu sebelum membuka halaman ini.");
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (request.nextUrl.pathname === "/dashboard" || request.nextUrl.pathname.startsWith("/teacher/dashboard"))) {
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    const profile = data as { role?: string } | null;
    const role = profile?.role ?? "student";
    const isTeacher = role === "teacher" || role === "instructor";

    if (request.nextUrl.pathname === "/dashboard" && isTeacher) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/teacher/dashboard";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }

    if (request.nextUrl.pathname.startsWith("/teacher/dashboard") && role === "student") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
