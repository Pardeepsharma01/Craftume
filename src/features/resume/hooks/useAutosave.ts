"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSaving,
  markClean,
  setResumeId,
  setSaveError,
} from "@/redux/slices/resumeSlice";
import { createResume, updateResume } from "../services/resumeService";
import { selectCurrentResume, selectIsDirty, selectResumeId } from "../selectors/resumeSelectors";

/**
 * useAutosave
 * ============
 * Watches `isDirty` from Redux state and debounces a save call
 * (2.5 seconds after the last edit). Performs a create if no DB row
 * exists yet, or an update if a resumeId is already set.
 *
 * After the FIRST successful create (i.e. no resumeId existed), silently
 * replaces the URL from `/protected/resume/new` → `/protected/resume/{id}`
 * using `router.replace` so the user stays on the same page with the same
 * state, but a page refresh will now correctly reload THEIR resume instead
 * of generating a fresh sample. `replace` (not `push`) avoids polluting the
 * browser history — the user won't see an extra entry when hitting Back.
 *
 * Also returns a `triggerSave` function for explicit manual saves.
 *
 * Debounce is implemented with plain setTimeout/useEffect — no extra packages.
 */
export function useAutosave(userId: string | null) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isDirty = useAppSelector(selectIsDirty);
  const currentResume = useAppSelector(selectCurrentResume);
  const resumeId = useAppSelector(selectResumeId);

  // Keep a stable ref to the latest resumeId so the debounced callback
  // always reads the current value without adding it to effect deps.
  const resumeIdRef = useRef<string | null>(resumeId);
  useEffect(() => {
    resumeIdRef.current = resumeId;
  }, [resumeId]);

  // ── Core save function ────────────────────────────────────────────────────
  const performSave = useCallback(async () => {
    if (!currentResume || !userId) return;

    dispatch(setSaving(true));
    dispatch(setSaveError(null));

    let currentId = resumeIdRef.current;

    // Task 4 Safety Guard: If resumeId in slice was null, but currentResume.id exists
    // and is not sample data (i.e. was previously saved or loaded), sync them up to avoid duplicate creation.
    if (!currentId && currentResume?.id && !currentResume.isSampleData) {
      console.warn(
        "[Autosave Guard] resumeId was null in slice, but currentResume.id exists and is not sample data. Syncing resumeId:",
        currentResume.id
      );
      currentId = currentResume.id;
      dispatch(setResumeId(currentId));
    }

    if (currentId) {
      // Row already exists — update it
      const { error } = await updateResume(currentId, currentResume);
      if (error) {
        console.error("[Autosave] Error updating resume:", error);
        dispatch(setSaveError(error));
        dispatch(setSaving(false));
      } else {
        dispatch(markClean());
        dispatch(setSaving(false));
      }
    } else {
      // First save — create a new row
      console.log("[Autosave] Creating new resume row in DB for user:", userId);
      const { data, error } = await createResume(userId, currentResume);
      if (error || !data) {
        console.error("[Autosave] Failed to create resume row:", error);
        dispatch(setSaveError(error ?? "Failed to create resume"));
        dispatch(setSaving(false));
      } else {
        console.log("[Autosave] Resume created in DB with ID:", data.id);
        // Persist the DB row id — future saves go to updateResume
        dispatch(setResumeId(data.id));
        dispatch(markClean());
        dispatch(setSaving(false));

        // Silently update the URL from /protected/resume/new → /protected/resume/{id}
        console.log("[Autosave] Executing router.replace to:", `/protected/resume/${data.id}`);
        router.replace(`/protected/resume/${data.id}`);
      }
    }
  }, [currentResume, userId, dispatch, router]);

  // ── Debounced autosave — fires 2.5 s after last edit ─────────────────────
  useEffect(() => {
    if (!isDirty) return;

    const timer = setTimeout(() => {
      performSave();
    }, 2500);

    // Cleanup: cancel if another edit arrives before the timer fires
    return () => clearTimeout(timer);
  }, [isDirty, currentResume, performSave]);
  // NOTE: `currentResume` is deliberately in deps so the timer restarts
  // on every field change, giving a true "2.5 s after the LAST edit" debounce.

  // ── Manual save trigger ───────────────────────────────────────────────────
  const triggerSave = useCallback(() => {
    performSave();
  }, [performSave]);

  return { triggerSave };
}
