import { Document, Page, View } from "@react-pdf/renderer";
import type { ResumeData, ResumeSection } from "../../types/resume.types";
import { pdfStyles } from "./pdfStyles";
import { PDFHeader } from "./PDFHeader";
import { SummaryPDF } from "./sections/SummaryPDF";
import { ExperiencePDF } from "./sections/ExperiencePDF";
import { EducationPDF } from "./sections/EducationPDF";
import { SkillsPDF } from "./sections/SkillsPDF";
import { ProjectsPDF } from "./sections/ProjectsPDF";
import { CertificationsPDF } from "./sections/CertificationsPDF";
import { LanguagesPDF } from "./sections/LanguagesPDF";
import { AchievementsPDF } from "./sections/AchievementsPDF";
import { CustomSectionPDF } from "./sections/CustomSectionPDF";

interface ResumePDFDocumentProps {
  resume: ResumeData;
}

/**
 * ResumePDFDocument — top-level react-pdf Document
 * ===================================================
 * Single A4 page using Helvetica (react-pdf built-in, no embedding needed).
 * Renders all section types in sorted order, mirroring the switch pattern
 * in the on-screen ResumePreview.tsx for consistency.
 */
export function ResumePDFDocument({ resume }: ResumePDFDocumentProps) {
  const { personalInfo, sections } = resume;

  // Sort sections by order, then filter to visible only — same logic as ResumePreview
  const sortedSections = [...sections]
    .sort((a, b) => a.order - b.order)
    .filter((sec) => sec.visible);

  const renderSection = (section: ResumeSection) => {
    switch (section.type) {
      case "summary":
        return (
          <SummaryPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "experience":
        return (
          <ExperiencePDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "education":
        return (
          <EducationPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "skills":
        return (
          <SkillsPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "projects":
        return (
          <ProjectsPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "certifications":
        return (
          <CertificationsPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "languages":
        return (
          <LanguagesPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "achievements":
        return (
          <AchievementsPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      case "custom":
        return (
          <CustomSectionPDF
            key={section.id}
            title={section.title}
            data={section.data}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Document
      title={resume.title || "Resume"}
      author={personalInfo.fullName || ""}
      subject="Resume"
      creator="Craftume"
      producer="Craftume"
    >
      <Page size="A4" style={pdfStyles.page}>
        {/* Personal Info Header */}
        <PDFHeader personalInfo={personalInfo} />

        {/* All Resume Sections — sorted by order, visible only */}
        <View>
          {sortedSections.map((section) => renderSection(section))}
        </View>
      </Page>
    </Document>
  );
}
