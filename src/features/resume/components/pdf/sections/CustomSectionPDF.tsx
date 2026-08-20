import { View, Text } from "@react-pdf/renderer";
import type { CustomSectionItem } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface CustomSectionPDFProps {
  title: string;
  data: CustomSectionItem[];
}

/**
 * Custom section — PDF version.
 * Matches on-screen CustomSectionPreview: "Label: Value" rows using
 * flexDirection: 'row' + justifyContent: 'space-between'.
 * Label is bold left, value is regular right — clean two-column layout.
 */
export function CustomSectionPDF({ title, data }: CustomSectionPDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      <View style={pdfStyles.compactContainer}>
        {data.map((item) => (
          <View key={item.id} style={pdfStyles.customRow}>
            {item.label && (
              <Text style={pdfStyles.customLabel}>{item.label}</Text>
            )}
            {item.value && (
              <Text style={pdfStyles.customValue}>{item.value}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
