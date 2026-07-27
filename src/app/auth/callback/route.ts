import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * OAuth Callback Route Handler
 * =============================
 * Handles the redirect from Google (and any future OAuth providers) after
 * the user authenticates with the provider.
 *
 * Google returns a `code` query param — NOT `token_hash` + `type`.
 * That means this route must use `exchangeCodeForSession(code)`.
 *
 * /auth/confirm  → email links  → verifyOtp(token_hash, type)
 * /auth/callback → OAuth code   → exchangeCodeForSession(code)  ← this file
 *
 * IMPORTANT: This route handler CANNOT use `createClient()` from
 * `@/lib/supabase/server` (which reads/writes via next/headers cookies()).
 * Route Handlers need session cookies written onto a specific NextResponse
 * object so the browser actually receives them. We wire the cookie handlers
 * directly to the request + response here — exactly the same pattern as
 * proxy.ts (middleware), per the official @supabase/ssr docs.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/protected";

  if (!code) {
    return NextResponse.redirect(
      `${origin}/auth/error?error=No+OAuth+code+returned+from+provider`,
    );
  }

  // Build the redirect response first so we have an object to attach cookies to
  const redirectResponse = NextResponse.redirect(`${origin}${next}`);
  const errorResponse = (msg: string) =>
    NextResponse.redirect(
      `${origin}/auth/error?error=${encodeURIComponent(msg)}`,
    );

  // Create a request-aware Supabase client that reads PKCE state from the
  // incoming request cookies and writes new session tokens onto redirectResponse
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write session cookies onto both the request (for any downstream
          // reads within this handler) and the response (so the browser gets them)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            redirectResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return errorResponse(error.message);
  }

  // Session cookies are now set on redirectResponse — return it so the browser
  // both receives the session tokens and lands on the correct page
  return redirectResponse;
}
