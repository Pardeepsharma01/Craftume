"use client";

import { useState, useRef, useLayoutEffect, useMemo, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentResume,
  selectSortedSections,
} from "../../selectors/resumeSelectors";
import type { ResumeSection } from "../../types/resume.types";
import {
  PAGE_WIDTH_PX,
  PAGE_HEIGHT_PX,
  USABLE_PAGE_HEIGHT_PX,
} from "../../constants/page";
import { SummaryPreview } from "./sections/SummaryPreview";
import { ExperiencePreview } from "./sections/ExperiencePreview";
import { EducationPreview } from "./sections/EducationPreview";
import { ProjectsPreview } from "./sections/ProjectsPreview";
import { SkillsPreview } from "./sections/SkillsPreview";
import { CertificationsPreview } from "./sections/CertificationsPreview";
import { LanguagesPreview } from "./sections/LanguagesPreview";
import { AchievementsPreview } from "./sections/AchievementsPreview";
import { CustomSectionPreview } from "./sections/CustomSectionPreview";

export function ResumePreview() {
  const currentResume = useAppSelector(selectCurrentResume);
  const sortedSections = useAppSelector(selectSortedSections);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const visibleSections = useMemo(() => {
    return sortedSections.filter((sec) => sec.visible);
  }, [sortedSections]);

  const personalInfo = currentResume?.personalInfo;
  const contactItems: string[] = useMemo(() => {
    if (!personalInfo) return [];
    return [
      personalInfo.email,
      personalInfo.phone,
      personalInfo.address,
      personalInfo.linkedin,
      personalInfo.github,
      personalInfo.portfolio,
      personalInfo.website,
    ].filter((item): item is string => Boolean(item && item.trim().length > 0));
  }, [personalInfo]);

  // Responsive scaling observer to dynamically fit true A4 paper into container width
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;
      const style = window.getComputedStyle(containerRef.current);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const availableWidth = Math.max(
        0,
        containerRef.current.clientWidth - paddingLeft - paddingRight
      );

      const computedScale = Math.min(1, availableWidth / PAGE_WIDTH_PX);
      setScale(computedScale);

      console.log(
        `[ResumePreview Scale] Container Width: ${containerRef.current.clientWidth}px | Available Width: ${availableWidth}px | Page Width: ${PAGE_WIDTH_PX}px | Computed Scale: ${computedScale.toFixed(4)}`
      );
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Measured overflow check against true unscaled A4 height limit (1043px)
  useLayoutEffect(() => {
    if (!contentRef.current || !currentResume || visibleSections.length === 0) {
      setIsOverflowing(false);
      return;
    }

    const contentHeight = contentRef.current.scrollHeight;
    const USABLE_H = USABLE_PAGE_HEIGHT_PX; // 1043px
    const overflowed = contentHeight > USABLE_H;

    setIsOverflowing(overflowed);

    console.log("=== SINGLE-PAGE A4 OVERFLOW DIAGNOSTIC ===");
    console.log(`Measured Inner Content Height: ${contentHeight}px`);
    console.log(`Usable A4 Height Ceiling: ${USABLE_H}px (Raw Height: ${PAGE_HEIGHT_PX}px, Padding: 80px)`);
    console.log(`Is Overflowing Single Page: ${overflowed}`);
  }, [currentResume, visibleSections]);

  const renderSection = (section: ResumeSection) => {
    switch (section.type) {
      case "summary":
        return <SummaryPreview key={section.id} title={section.title} data={section.data} />;
      case "experience":
        return <ExperiencePreview key={section.id} title={section.title} data={section.data} />;
      case "education":
        return <EducationPreview key={section.id} title={section.title} data={section.data} />;
      case "projects":
        return <ProjectsPreview key={section.id} title={section.title} data={section.data} />;
      case "skills":
        return <SkillsPreview key={section.id} title={section.title} data={section.data} />;
      case "certifications":
        return <CertificationsPreview key={section.id} title={section.title} data={section.data} />;
      case "languages":
        return <LanguagesPreview key={section.id} title={section.title} data={section.data} />;
      case "achievements":
        return <AchievementsPreview key={section.id} title={section.title} data={section.data} />;
      case "custom":
        return <CustomSectionPreview key={section.id} title={section.title} data={section.data} />;
      default:
        return null;
    }
  };

  if (!currentResume || !personalInfo) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 text-center">
        <p className="text-xs text-muted-foreground italic">
          Start filling out your details to see a real-time preview.
        </p>
      </div>
    );
  }

  const renderHeader = () => (
    <header className="border-b-2 border-zinc-900 pb-3 space-y-0.5 text-left">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 uppercase">
        {personalInfo.fullName || "Your Full Name"}
      </h1>

      {personalInfo.jobTitle && (
        <p className="text-xs sm:text-sm font-bold text-zinc-700 uppercase tracking-wide">
          {personalInfo.jobTitle}
        </p>
      )}

      {contactItems.length > 0 && (
        <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-0.5 text-[11px] text-zinc-600 pt-1 font-medium leading-snug">
          {contactItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span>{item}</span>
              {idx < contactItems.length - 1 && (
                <span className="text-zinc-400 font-bold">•</span>
              )}
            </span>
          ))}
        </div>
      )}
    </header>
  );

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center p-3 sm:p-6"
    >
      {/* Overflow Warning Alert Banner */}
      {isOverflowing && (
        <div
          style={{ maxWidth: `${PAGE_WIDTH_PX * scale}px` }}
          className="w-full mb-4 flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs text-amber-200 backdrop-blur-md shadow-lg transition-all animate-in fade-in slide-in-from-top-2"
        >
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="font-medium text-amber-300">
            Your resume exceeds one page. Consider shortening a section — most recruiters and ATS systems prefer single-page resumes.
          </p>
        </div>
      )}

      {/* Responsive Scale Container (Reserves exact scaled bounding box footprint in document flow) */}
      <div
        style={{
          width: `${PAGE_WIDTH_PX * scale}px`,
          height: `${PAGE_HEIGHT_PX * scale}px`,
        }}
        className="relative shrink-0 flex items-start justify-start transition-all duration-150"
      >
        {/* Strict True A4 Paper Canvas (794px x 1123px at 96 DPI basis) */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="relative w-[794px] min-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] bg-white text-zinc-900 shadow-2xl rounded-sm p-10 border border-zinc-200 overflow-hidden selection:bg-zinc-200 shrink-0"
        >
          <div ref={contentRef} className="space-y-3.5">
            {renderHeader()}
            <div className="space-y-3.5">
              {visibleSections.map((sec) => renderSection(sec))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
