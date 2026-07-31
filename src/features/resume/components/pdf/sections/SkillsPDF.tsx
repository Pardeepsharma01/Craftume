import { View, Text } from "@react-pdf/renderer";
import type { SkillCategory } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface SkillsPDFProps {
  title: string;
  data: SkillCategory[];
}

/**
 * Skills section — PDF version.
 * Matches on-screen SkillsPreview: each category rendered as
 *   "CategoryName:  skill1, skill2, skill3"
 * Comma-separated inline text is the standard PDF-resume pattern —
 * cleaner and more reliable than trying to replicate pill/tag styling.
 */
export function SkillsPDF({ title, data }: SkillsPDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      <View style={pdfStyles.skillsContainer}>
        {data.map((cat) => (
          <View key={cat.id} style={pdfStyles.skillRow}>
            {cat.categoryName && (
              <Text style={pdfStyles.skillCategoryName}>{cat.categoryName}: </Text>
            )}
            <Text style={pdfStyles.skillList}>
              {(cat.skills || []).join(", ")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
