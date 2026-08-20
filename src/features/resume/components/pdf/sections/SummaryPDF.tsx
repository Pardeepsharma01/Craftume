import { View, Text } from "@react-pdf/renderer";
import type { SummarySectionData } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface SummaryPDFProps {
  title: string;
  data: SummarySectionData;
}

/**
 * Summary section — PDF version.
 * Matches on-screen SummaryPreview: section title + bottom border, then paragraph text.
 */
export function SummaryPDF({ title, data }: SummaryPDFProps) {
  if (!data || !data.content || !data.content.trim()) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <Text style={pdfStyles.summaryText}>{data.content}</Text>
    </View>
  );
}
