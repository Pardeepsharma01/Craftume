/**
 * App-Wide Constants
 * ==================
 * Non-config, non-feature constants shared across the application.
 * Keep feature-specific constants inside the relevant feature module.
 */

/** Public routes that skip auth checks in proxy middleware. */
export const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/sign-up",
  "/auth/forgot-password", "/auth/update-password", "/auth/confirm",
  "/auth/error"] as const;

/** Supabase session cookie name (mirrors @supabase/ssr internals). */
export const SUPABASE_SESSION_COOKIE = "sb-session";

/** Resume file size limit in bytes (mirrors appConfig.MAX_UPLOAD_SIZE). */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Supported MIME types for resume file uploads. */
export const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/** ATS score thresholds (0-100). */
export const ATS_SCORE_THRESHOLDS = {
  POOR: 40,
  FAIR: 65,
  GOOD: 80,
  EXCELLENT: 95,
} as const;
