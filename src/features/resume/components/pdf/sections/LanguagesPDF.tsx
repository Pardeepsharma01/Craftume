import { View, Text } from "@react-pdf/renderer";
import type { LanguageEntry } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface LanguagesPDFProps {
  title: string;
  data: LanguageEntry[];
}

/**
 * Languages section — PDF version.
 * Matches on-screen LanguagesPreview: horizontal flex-wrap row of
 *   "Language (Proficiency)" items, separated by spacing.
 * Uses the same flex-wrap layout the on-screen preview uses.
 */
export function LanguagesPDF({ title, data }: LanguagesPDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      <View style={pdfStyles.languagesRow}>
        {data.map((item, idx) => (
          <View key={item.id} style={pdfStyles.languageItem}>
            <Text style={pdfStyles.languageName}>{item.name}</Text>
            {item.proficiency && (
              <Text style={pdfStyles.languageProficiency}>
                ({item.proficiency})
              </Text>
            )}
            {/* Separator between items except the last */}
            {idx < data.length - 1 && (
              <Text style={pdfStyles.languageSep}>{"  \u2022  "}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
