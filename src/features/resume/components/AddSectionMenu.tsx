"use client";

import { useState } from "react";
import {
  Plus,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Wrench,
  Award,
  Languages,
  Trophy,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addSection } from "@/redux/slices/resumeSlice";
import type { ResumeSection, SectionType } from "../types/resume.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AddSectionMenuProps {
  currentOrder: number;
}

export function AddSectionMenu({ currentOrder }: AddSectionMenuProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const sectionPresets: {
    type: SectionType;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      type: "experience",
      title: "Work Experience",
      icon: Briefcase,
    },
    {
      type: "education",
      title: "Education",
      icon: GraduationCap,
    },
    {
      type: "projects",
      title: "Projects",
      icon: FolderKanban,
    },
    {
      type: "skills",
      title: "Skills",
      icon: Wrench,
    },
    {
      type: "certifications",
      title: "Certifications",
      icon: Award,
    },
    {
      type: "languages",
      title: "Languages",
      icon: Languages,
    },
    {
      type: "achievements",
      title: "Honors & Achievements",
      icon: Trophy,
    },
    {
      type: "custom",
      title: "Custom Section",
      icon: Layers,
    },
  ];

  const handleAdd = (preset: (typeof sectionPresets)[0]) => {
    const base = {
      id: crypto.randomUUID(),
      title: preset.title,
      order: currentOrder,
      visible: true,
    };

    let newSection: ResumeSection;

    switch (preset.type) {
      case "experience":
        newSection = { ...base, type: "experience", data: [] };
        break;
      case "education":
        newSection = { ...base, type: "education", data: [] };
        break;
      case "projects":
        newSection = { ...base, type: "projects", data: [] };
        break;
      case "skills":
        newSection = { ...base, type: "skills", data: [] };
        break;
      case "certifications":
        newSection = { ...base, type: "certifications", data: [] };
        break;
      case "languages":
        newSection = { ...base, type: "languages", data: [] };
        break;
      case "achievements":
        newSection = { ...base, type: "achievements", data: [] };
        break;
      case "custom":
        newSection = { ...base, type: "custom", data: [] };
        break;
      default:
        newSection = { ...base, type: "summary", data: { content: "" } };
    }

    dispatch(addSection(newSection));
    setIsOpen(false);
  };

  return (
    <div className="pt-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 hover:from-primary/20 hover:via-secondary/20 hover:to-accent/20 py-3.5 px-4 text-xs font-bold text-foreground shadow-md transition-all duration-200"
          >
            <Plus className="h-4 w-4 text-primary" />
            <span>Add New Resume Section</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-64 rounded-xl border border-border bg-card/95 backdrop-blur-xl p-2 shadow-2xl text-foreground"
        >
          <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase px-2 py-1.5">
            Select Section Type
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/60" />

          {sectionPresets.map((preset) => {
            const Icon = preset.icon;
            return (
              <DropdownMenuItem
                key={preset.type + preset.title}
                onClick={() => handleAdd(preset)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-primary/10 transition-colors"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{preset.title}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
