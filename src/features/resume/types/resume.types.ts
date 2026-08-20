/**
 * Resume Data Model TypeScript Types
 * ====================================
 * Fully serializable interfaces representing the resume structure.
 * Stored as a single JSONB blob in Supabase.
 */

export type SectionType =
  | "summary"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "certifications"
  | "languages"
  | "achievements"
  | "custom";

export interface PersonalInfo {
  fullName: string;
  email: string;
  jobTitle?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
}

export interface SummarySectionData {
  content: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  /** Array of bullet points describing key responsibilities & achievements */
  responsibilities: string[];
  technologies: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  grade?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl?: string;
}

export interface LanguageEntry {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Proficient" | "Intermediate" | "Basic" | string;
}

export interface AchievementEntry {
  id: string;
  text: string;
}

export interface CustomSectionItem {
  id: string;
  label: string;
  value: string;
}

/** Discriminated union of all supported section types */
export type ResumeSection =
  | {
      id: string;
      type: "summary";
      title: string;
      order: number;
      visible: boolean;
      data: SummarySectionData;
    }
  | {
      id: string;
      type: "experience";
      title: string;
      order: number;
      visible: boolean;
      data: ExperienceEntry[];
    }
  | {
      id: string;
      type: "education";
      title: string;
      order: number;
      visible: boolean;
      data: EducationEntry[];
    }
  | {
      id: string;
      type: "projects";
      title: string;
      order: number;
      visible: boolean;
      data: ProjectEntry[];
    }
  | {
      id: string;
      type: "skills";
      title: string;
      order: number;
      visible: boolean;
      data: SkillCategory[];
    }
  | {
      id: string;
      type: "certifications";
      title: string;
      order: number;
      visible: boolean;
      data: CertificationEntry[];
    }
  | {
      id: string;
      type: "languages";
      title: string;
      order: number;
      visible: boolean;
      data: LanguageEntry[];
    }
  | {
      id: string;
      type: "achievements";
      title: string;
      order: number;
      visible: boolean;
      data: AchievementEntry[];
    }
  | {
      id: string;
      type: "custom";
      title: string;
      order: number;
      visible: boolean;
      data: CustomSectionItem[];
    };

/** Top-level Resume Data Model */
export interface ResumeData {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
  createdAt: string;
  updatedAt: string;
  isSampleData?: boolean;
}
