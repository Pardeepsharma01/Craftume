/**
 * Resume Service Layer
 * =====================
 * All Supabase interactions for the `resumes` table go through here.
 * Components and hooks NEVER call Supabase directly — always via this service.
 *
 * Return shape is always { data, error } — error is a clean string
 * message (never a raw Supabase/Postgres error object).
 */

import { createClient } from "@/lib/supabase/client";
import type { ResumeData } from "../types/resume.types";

/** Shape of a raw row returned from public.resumes */
export interface ResumeRow {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  resume_json: ResumeData;
  is_sample_data: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Extract a human-readable string from any Supabase/Postgres error. */
function toErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object" && "message" in (err as object)) {
    return String((err as { message: unknown }).message);
  }
  return "An unexpected error occurred";
}

// ── CRUD functions ────────────────────────────────────────────────────────────

/**
 * Insert a brand-new resume row.
 * The resume's own `id` field is used as the DB primary key (single source of truth).
 */
export async function createResume(
  userId: string,
  resumeData: ResumeData
): Promise<{ data: ResumeRow | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("resumes")
      .insert({
        id: resumeData.id,            // use ResumeData.id as the DB PK
        user_id: userId,
        title: resumeData.title || "Untitled Resume",
        template_id: resumeData.templateId || "modern",
        resume_json: resumeData,
        is_sample_data: resumeData.isSampleData ?? false,
      })
      .select()
      .single();

    if (error) return { data: null, error: toErrorMessage(error) };
    return { data: data as ResumeRow, error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}

/**
 * Update an existing resume's content and metadata columns.
 */
export async function updateResume(
  resumeId: string,
  resumeData: ResumeData
): Promise<{ data: ResumeRow | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("resumes")
      .update({
        title: resumeData.title || "Untitled Resume",
        template_id: resumeData.templateId || "modern",
        resume_json: resumeData,
        is_sample_data: resumeData.isSampleData ?? false,
        // updated_at is managed by the DB trigger — no need to set it here
      })
      .eq("id", resumeId)
      .select()
      .single();

    if (error) return { data: null, error: toErrorMessage(error) };
    return { data: data as ResumeRow, error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}

/**
 * Fetch a single resume by its ID.
 * RLS guarantees only the owner can access it — a 404 (PGRST116) means
 * either not found or unauthorized (we surface both as "not found").
 */
export async function getResumeById(
  resumeId: string
): Promise<{ data: ResumeRow | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .is("deleted_at", null)
      .single();

    if (error) {
      // PGRST116 = "no rows found" — treat as friendly not-found
      if (error.code === "PGRST116") {
        return { data: null, error: "Resume not found or access denied." };
      }
      return { data: null, error: toErrorMessage(error) };
    }
    return { data: data as ResumeRow, error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}

/**
 * Fetch all non-deleted resumes for a user, sorted by most recently updated.
 */
export async function getUserResumes(
  userId: string
): Promise<{ data: ResumeRow[] | null; error: string | null }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("updated_at", { ascending: false });

    if (error) return { data: null, error: toErrorMessage(error) };
    return { data: (data as ResumeRow[]) ?? [], error: null };
  } catch (err) {
    return { data: null, error: toErrorMessage(err) };
  }
}

/**
 * Soft-delete a resume by setting deleted_at to the current timestamp.
 * The row is NOT removed from the DB — the app layer filters it out.
 */
export async function softDeleteResume(
  resumeId: string
): Promise<{ error: string | null }> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("resumes")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", resumeId);

    if (error) return { error: toErrorMessage(error) };
    return { error: null };
  } catch (err) {
    return { error: toErrorMessage(err) };
  }
}
