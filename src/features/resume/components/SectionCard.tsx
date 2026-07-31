"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit2,
  FileText,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Wrench,
  Award,
  Languages as LanguagesIcon,
  Trophy,
  Layers,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import {
  renameSectionTitle,
  toggleSectionVisibility,
  removeSection,
} from "@/redux/slices/resumeSlice";
import type { ResumeSection } from "../types/resume.types";
import { SummaryForm } from "./forms/SummaryForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { SkillsForm } from "./forms/SkillsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { LanguagesForm } from "./forms/LanguagesForm";
import { AchievementsForm } from "./forms/AchievementsForm";
import { CustomSectionForm } from "./forms/CustomSectionForm";

interface SectionCardProps {
  section: ResumeSection;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  defaultOpen?: boolean;
}

export function SectionCard({
  section,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  defaultOpen = false,
}: SectionCardProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(section.title);

  const getSectionIcon = (type: ResumeSection["type"]) => {
    switch (type) {
      case "summary":
        return <FileText className="h-4 w-4 text-primary" />;
      case "experience":
        return <Briefcase className="h-4 w-4 text-primary" />;
      case "education":
        return <GraduationCap className="h-4 w-4 text-primary" />;
      case "projects":
        return <FolderKanban className="h-4 w-4 text-primary" />;
      case "skills":
        return <Wrench className="h-4 w-4 text-primary" />;
      case "certifications":
        return <Award className="h-4 w-4 text-primary" />;
      case "languages":
        return <LanguagesIcon className="h-4 w-4 text-primary" />;
      case "achievements":
        return <Trophy className="h-4 w-4 text-primary" />;
      default:
        return <Layers className="h-4 w-4 text-primary" />;
    }
  };

  const handleTitleSubmit = () => {
    if (titleInput.trim() && titleInput !== section.title) {
      dispatch(renameSectionTitle({ sectionId: section.id, title: titleInput.trim() }));
    }
    setIsEditingTitle(false);
  };

  const renderSectionForm = () => {
    switch (section.type) {
      case "summary":
        return <SummaryForm sectionId={section.id} data={section.data} />;
      case "experience":
        return <ExperienceForm sectionId={section.id} data={section.data} />;
      case "education":
        return <EducationForm sectionId={section.id} data={section.data} />;
      case "projects":
        return <ProjectsForm sectionId={section.id} data={section.data} />;
      case "skills":
        return <SkillsForm sectionId={section.id} data={section.data} />;
      case "certifications":
        return <CertificationsForm sectionId={section.id} data={section.data} />;
      case "languages":
        return <LanguagesForm sectionId={section.id} data={section.data} />;
      case "achievements":
        return <AchievementsForm sectionId={section.id} data={section.data} />;
      case "custom":
        return <CustomSectionForm sectionId={section.id} data={section.data} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 shadow-lg backdrop-blur-xl ${
        section.visible
          ? "border-border bg-card/40 hover:border-primary/30"
          : "border-border/40 bg-card/20 opacity-60"
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0">
            {getSectionIcon(section.type)}
          </div>

          {/* Title or Title Input */}
          <div className="flex-1 min-w-0">
            {isEditingTitle ? (
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                autoFocus
                className="w-full rounded-lg border border-primary bg-card/80 px-2 py-1 text-xs font-semibold text-foreground focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {section.title}
                </h3>
                <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Reorder Up */}
          <button
            type="button"
            disabled={isFirst}
            onClick={onMoveUp}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Move Section Up"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>

          {/* Reorder Down */}
          <button
            type="button"
            disabled={isLast}
            onClick={onMoveDown}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Move Section Down"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>

          {/* Visibility Toggle */}
          <button
            type="button"
            onClick={() => dispatch(toggleSectionVisibility(section.id))}
            className={`p-1.5 rounded-lg transition-colors ${
              section.visible
                ? "text-emerald-400 hover:bg-emerald-500/10"
                : "text-muted-foreground hover:bg-card/60"
            }`}
            title={section.visible ? "Hide Section in Preview" : "Show Section in Preview"}
          >
            {section.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          </button>

          {/* Collapse/Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/60 transition-colors"
            title={isOpen ? "Collapse Section" : "Expand Section"}
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {/* Delete Section */}
          <button
            type="button"
            onClick={() => dispatch(removeSection(section.id))}
            className="p-1.5 rounded-lg text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Remove Section"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/40 p-4 sm:p-5"
          >
            {renderSectionForm()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
