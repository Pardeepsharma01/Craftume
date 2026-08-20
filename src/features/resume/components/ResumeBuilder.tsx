"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit3, Eye, FileText, Check, User, AlertCircle, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createSampleResume } from "../utils/createSampleResume";
import { useResumeSelectors } from "../hooks/useResumeSelectors";
import { useAutosave } from "../hooks/useAutosave";
import { setResume, setResumeId, resetResume, reorderSections } from "@/redux/slices/resumeSlice";
import { getResumeById } from "../services/resumeService";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { SectionCard } from "./SectionCard";
import { AddSectionMenu } from "./AddSectionMenu";
import { ResumePreview } from "./preview/ResumePreview";
import { SampleDataBanner } from "./SampleDataBanner";
import { DownloadPDFButton } from "./pdf/DownloadPDFButton";
import { fadeUp } from "@/lib/motion-variants";

interface ResumeBuilderProps {
  /**
   * When provided (from `/protected/resume/[id]`), the builder fetches
   * the existing resume from Supabase and loads it into Redux state.
   * When undefined (from `/protected/resume/new`), the builder initialises
   * with the sample resume as usual — no resumeId is set until first autosave.
   */
  existingResumeId?: string;
}

export function ResumeBuilder({ existingResumeId }: ResumeBuilderProps) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const { currentResume, sortedSections, personalInfo, isDirty, isSaving, saveError } =
    useResumeSelectors();

  // Mobile tab state: 'form' | 'preview'
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  // Loading/error state for fetching an existing resume by id
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);

  // Wire autosave — runs automatically whenever isDirty becomes true
  const { triggerSave } = useAutosave(authUser?.id ?? null);

  // ── Mount effect: load existing OR initialise with sample resume ──────────
  useEffect(() => {
    if (existingResumeId) {
      // If Redux already holds this resume (e.g. just saved or already loaded), no need to re-fetch or show loading screen
      if (currentResume?.id === existingResumeId && !currentResume.isSampleData) {
        dispatch(setResumeId(existingResumeId));
        return;
      }

      // Editing an existing resume — fetch from DB
      setIsLoadingExisting(true);
      setLoadError(null);

      getResumeById(existingResumeId).then(({ data, error }) => {
        setIsLoadingExisting(false);
        if (error || !data) {
          setLoadError(error ?? "Resume not found.");
          return;
        }
        // Hydrate Redux with the fetched resume content
        dispatch(setResume(data.resume_json));
        // Set the DB id so autosave uses updateResume (not createResume)
        dispatch(setResumeId(data.id));
      });
    } else {
      // New resume — always reset first so any previously-loaded resume
      // (and its resumeId) is cleared before loading the fresh sample.
      // This handles the case where the user navigates from /resume/{id} → /new.
      const userId = authUser?.id || "demo-user-123";
      dispatch(resetResume());
      dispatch(setResume(createSampleResume(userId)));
    }
    // Deliberately exclude currentResume from deps — we only want this on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingResumeId, authUser, dispatch]);

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedSections.length) return;

    const ids = sortedSections.map((s) => s.id);
    const temp = ids[index];
    ids[index] = ids[targetIndex];
    ids[targetIndex] = temp;

    dispatch(reorderSections(ids));
  };

  // ── Loading state (fetching existing resume) ──────────────────────────────
  if (isLoadingExisting) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Loading resume...</span>
        </div>
      </div>
    );
  }

  // ── Error state (resume not found / no access) ────────────────────────────
  if (loadError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-foreground">Unable to load resume</p>
          <p className="text-xs text-muted-foreground">{loadError}</p>
        </div>
      </div>
    );
  }

  // ── Initialising state (waiting for sample resume to load) ────────────────
  if (!currentResume) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Initializing Resume Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] w-full overflow-hidden">
      {/* Mobile Tab Switcher (Visible only below md: breakpoint) */}
      <div className="flex md:hidden items-center justify-center p-3 border-b border-border bg-background/80 backdrop-blur-md shrink-0">
        <div className="flex w-full max-w-xs rounded-2xl border border-border bg-card/60 p-1 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setMobileTab("form")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all ${
              mobileTab === "form"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Form Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all ${
              mobileTab === "preview"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT PANEL: Form Editor (Visible on Desktop OR Mobile Form Tab) */}
        <div
          className={`flex-1 flex-col overflow-y-auto p-4 sm:p-6 space-y-6 border-r border-border/60 ${
            mobileTab === "form" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Header & Status Indicator + Download PDF action */}
          <div className="flex justify-between items-center border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-foreground tracking-tight">
                  {currentResume.title}
                </h1>
                <p className="text-[11px] text-muted-foreground">
                  Form Editor — Edit personal details and dynamic sections
                </p>
              </div>
            </div>

            {/* Right side: save status + manual save + Download PDF */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Save status indicator — 4 states */}
              <div className="text-[11px] font-semibold">
                {saveError ? (
                  <button
                    type="button"
                    onClick={triggerSave}
                    title="Click to retry"
                    className="text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors"
                  >
                    <AlertCircle className="h-3 w-3" />
                    Save failed — retry
                  </button>
                ) : isSaving ? (
                  <span className="text-blue-400 flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                    Saving...
                  </span>
                ) : isDirty ? (
                  <button
                    type="button"
                    onClick={triggerSave}
                    title="Save now"
                    className="text-amber-400 flex items-center gap-1 hover:text-amber-300 transition-colors"
                  >
                    <Save className="h-3 w-3" />
                    Unsaved
                  </button>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Synced
                  </span>
                )}
              </div>

              {/* Download PDF — production button */}
              <DownloadPDFButton resume={currentResume} />
            </div>
          </div>

          {/* Sample Data Banner (Shown ONLY when currentResume.isSampleData is true) */}
          {currentResume.isSampleData && <SampleDataBanner />}

          {/* Personal Info Card (Fixed top section) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-5 shadow-lg space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <User className="h-4 w-4" />
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-foreground">
                Personal &amp; Contact Information
              </h2>
            </div>
            {personalInfo && <PersonalInfoForm initialData={personalInfo} />}
          </motion.div>

          {/* Dynamic Sections Accordion List */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Resume Sections ({sortedSections.length})
            </h2>

            {sortedSections.map((section, idx) => (
              <SectionCard
                key={section.id}
                section={section}
                isFirst={idx === 0}
                isLast={idx === sortedSections.length - 1}
                onMoveUp={() => handleMoveSection(idx, "up")}
                onMoveDown={() => handleMoveSection(idx, "down")}
                defaultOpen={idx === 0}
              />
            ))}

            {/* Add New Section Menu */}
            <AddSectionMenu currentOrder={sortedSections.length} />
          </div>
        </div>

        {/* RIGHT PANEL: Live Resume Preview (Visible on Desktop OR Mobile Preview Tab) */}
        <div
          className={`flex-1 flex-col overflow-y-auto bg-card/10 backdrop-blur-md ${
            mobileTab === "preview" ? "flex" : "hidden md:flex"
          }`}
        >
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
