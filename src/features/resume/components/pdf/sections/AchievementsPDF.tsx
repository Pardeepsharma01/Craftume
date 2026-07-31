import { View, Text } from "@react-pdf/renderer";
import type { AchievementEntry } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface AchievementsPDFProps {
  title: string;
  data: AchievementEntry[];
}

/**
 * Achievements section — PDF version.
 * Matches on-screen AchievementsPreview: bulleted list of achievement text.
 * Uses the same manual bullet-row pattern established in ExperiencePDF.
 */
export function AchievementsPDF({ title, data }: AchievementsPDFProps) {
  if (!data || data.length === 0) return null;

  const filtered = data.filter((item) => item.text && item.text.trim());
  if (filtered.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      <View style={pdfStyles.bulletList}>
        {filtered.map((item) => (
          <View key={item.id} style={pdfStyles.bulletRow}>
            <Text style={pdfStyles.bulletSymbol}>{"\u2022"}</Text>
            <Text style={pdfStyles.bulletText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
