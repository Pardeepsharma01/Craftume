import { View, Text } from "@react-pdf/renderer";
import type { EducationEntry } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface EducationPDFProps {
  title: string;
  data: EducationEntry[];
}

/**
 * Education section — PDF version.
 * Matches on-screen EducationPreview:
 *   [Degree | Institution (semi-bold)]         [Start – End dates]
 *   Grade / Honors: ...
 */
export function EducationPDF({ title, data }: EducationPDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      {data.map((item) => {
        const dateString = [
          item.startDate,
          item.startDate && item.endDate ? " \u2013 " : "",
          item.endDate ?? "",
        ]
          .filter(Boolean)
          .join("");

        return (
          <View key={item.id} style={pdfStyles.entryContainer}>
            {/* Header row: [Degree | Institution]  ↔  [Dates] */}
            <View style={pdfStyles.entryHeaderRow}>
              <View style={{ flexDirection: "row", flexShrink: 1, flexWrap: "wrap", alignItems: "baseline" }}>
                <Text style={pdfStyles.entryPosition}>
                  {item.degree || "Degree"}
                </Text>
                {item.institution && (
                  <>
                    <Text style={pdfStyles.entryCompanySeparator}>{" | "}</Text>
                    <Text style={pdfStyles.entryCompany}>{item.institution}</Text>
                  </>
                )}
              </View>
              {dateString && (
                <Text style={pdfStyles.entryDates}>{dateString}</Text>
              )}
            </View>

            {/* Grade / Honors */}
            {item.grade && item.grade.trim() && (
              <View style={{ flexDirection: "row", marginTop: 1 }}>
                <Text style={pdfStyles.technologiesLabel}>Grade / Honors: </Text>
                <Text style={pdfStyles.technologiesText}>{item.grade}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
