import { View, Text } from "@react-pdf/renderer";
import type { ExperienceEntry } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface ExperiencePDFProps {
  title: string;
  data: ExperienceEntry[];
}

/**
 * Experience section — PDF version
 * Matches on-screen ExperiencePreview.tsx layout:
 *   - Section title: bold, uppercase, tracking, bottom border
 *   - Each entry:
 *       [Position | Company]          [StartDate – EndDate]
 *       Location (italic, smaller)
 *       • Bullet point text
 *       • Bullet point text
 *       Technologies: tech1, tech2
 */
export function ExperiencePDF({ title, data }: ExperiencePDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      {/* Section title with bottom border */}
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      {data.map((item) => {
        // Build date string matching on-screen preview logic
        const dateString = [
          item.startDate,
          item.startDate && (item.endDate || item.isCurrent) ? " \u2013 " : "",
          item.isCurrent ? "Present" : item.endDate ?? "",
        ]
          .filter(Boolean)
          .join("");

        return (
          <View key={item.id} style={pdfStyles.entryContainer}>
            {/* Header row: [Position | Company] ↔ [Dates] */}
            <View style={pdfStyles.entryHeaderRow}>
              {/* Left side: position + company */}
              <View style={{ flexDirection: "row", flexShrink: 1, flexWrap: "wrap", alignItems: "baseline" }}>
                <Text style={pdfStyles.entryPosition}>
                  {item.position || "Untitled Position"}
                </Text>
                {item.company && (
                  <>
                    <Text style={pdfStyles.entryCompanySeparator}>{" | "}</Text>
                    <Text style={pdfStyles.entryCompany}>{item.company}</Text>
                  </>
                )}
              </View>

              {/* Right side: dates */}
              {dateString && (
                <Text style={pdfStyles.entryDates}>{dateString}</Text>
              )}
            </View>

            {/* Location */}
            {item.location && item.location.trim() && (
              <Text style={pdfStyles.entryLocation}>{item.location}</Text>
            )}

            {/* Responsibilities — bulleted list */}
            {item.responsibilities && item.responsibilities.length > 0 && (
              <View style={pdfStyles.bulletList}>
                {item.responsibilities
                  .filter((resp) => resp.trim().length > 0)
                  .map((resp, i) => (
                    <View key={i} style={pdfStyles.bulletRow}>
                      <Text style={pdfStyles.bulletSymbol}>{"\u2022"}</Text>
                      <Text style={pdfStyles.bulletText}>
                        {/* Strip any leading bullet/dash chars as the on-screen preview does */}
                        {resp.replace(/^[•\-\*\s]+/, "")}
                      </Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <View style={pdfStyles.technologiesRow}>
                <Text style={pdfStyles.technologiesLabel}>Technologies: </Text>
                <Text style={pdfStyles.technologiesText}>
                  {item.technologies.join(", ")}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
