"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit3, Eye, FileText, Check, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createEmptyResume } from "../utils/createEmptyResume";
import { createSampleResume } from "../utils/createSampleResume";
import { useResumeSelectors } from "../hooks/useResumeSelectors";
import { setResume, reorderSections } from "@/redux/slices/resumeSlice";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { SectionCard } from "./SectionCard";
import { AddSectionMenu } from "./AddSectionMenu";
import { ResumePreview } from "./preview/ResumePreview";
import { SampleDataBanner } from "./SampleDataBanner";
import { DownloadPDFButton } from "./pdf/DownloadPDFButton";
import { fadeUp } from "@/lib/motion-variants";

export function ResumeBuilder() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const { currentResume, sortedSections, personalInfo, isDirty, isSaving } =
    useResumeSelectors();

  // Mobile tab state: 'form' | 'preview'
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  // Ensure a sample resume is loaded into state on mount if null
  useEffect(() => {
    if (!currentResume) {
      const userId = authUser?.id || "demo-user-123";
      dispatch(setResume(createSampleResume(userId)));
    }
  }, [currentResume, authUser, dispatch]);

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedSections.length) return;

    const ids = sortedSections.map((s) => s.id);
    const temp = ids[index];
    ids[index] = ids[targetIndex];
    ids[targetIndex] = temp;

    dispatch(reorderSections(ids));
  };

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

            {/* Right side: save status + Download PDF */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Dirty / Saving status */}
              <div className="text-[11px] font-semibold">
                {isSaving ? (
                  <span className="text-blue-400 flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                    Saving...
                  </span>
                ) : isDirty ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-amber-400" />
                    Unsaved
                  </span>
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
                Personal & Contact Information
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
