import type { ResumeData, ResumeSection } from "../types/resume.types";

/**
 * Creates a brand new empty resume populated with sensible default sections
 * (Summary, Experience, Education, Skills, Projects) sequentially ordered.
 */
export function createEmptyResume(userId: string): ResumeData {
  const now = new Date().toISOString();

  const defaultSections: ResumeSection[] = [
    {
      id: crypto.randomUUID(),
      type: "summary",
      title: "Professional Summary",
      order: 0,
      visible: true,
      data: { content: "" },
    },
    {
      id: crypto.randomUUID(),
      type: "experience",
      title: "Work Experience",
      order: 1,
      visible: true,
      data: [],
    },
    {
      id: crypto.randomUUID(),
      type: "education",
      title: "Education",
      order: 2,
      visible: true,
      data: [],
    },
    {
      id: crypto.randomUUID(),
      type: "skills",
      title: "Skills",
      order: 3,
      visible: true,
      data: [],
    },
    {
      id: crypto.randomUUID(),
      type: "projects",
      title: "Projects",
      order: 4,
      visible: true,
      data: [],
    },
  ];

  return {
    id: crypto.randomUUID(),
    userId,
    title: "Untitled Resume",
    templateId: "modern",
    personalInfo: {
      fullName: "",
      email: "",
      jobTitle: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      portfolio: "",
      website: "",
    },
    sections: defaultSections,
    createdAt: now,
    updatedAt: now,
  };
}
