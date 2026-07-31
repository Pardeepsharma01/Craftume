import { View, Text } from "@react-pdf/renderer";
import type { PersonalInfo } from "../../types/resume.types";
import { pdfStyles } from "./pdfStyles";

interface PDFHeaderProps {
  personalInfo: PersonalInfo;
}

/**
 * PDF Header — renders name, job title, and contact row
 * Matches the on-screen ResumePreview header:
 *   - Bold uppercase name (large)
 *   - Bold uppercase job title (smaller)
 *   - Contact items in a horizontal wrapped row with "•" separators
 *   - Bottom border divider
 */
export function PDFHeader({ personalInfo }: PDFHeaderProps) {
  // Build filtered contact items list, exactly as the on-screen preview does
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.address,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.portfolio,
    personalInfo.website,
  ].filter((item): item is string => Boolean(item && item.trim().length > 0));

  return (
    <View style={pdfStyles.header}>
      {/* Full Name */}
      <Text style={pdfStyles.name}>
        {personalInfo.fullName || "Your Full Name"}
      </Text>

      {/* Job Title */}
      {personalInfo.jobTitle && personalInfo.jobTitle.trim() && (
        <Text style={pdfStyles.jobTitle}>{personalInfo.jobTitle}</Text>
      )}

      {/* Contact Row — horizontal wrapped flex with "•" separators */}
      {contactItems.length > 0 && (
        <View style={pdfStyles.contactRow}>
          {contactItems.map((item, idx) => (
            <View key={idx} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={pdfStyles.contactItem}>{item}</Text>
              {idx < contactItems.length - 1 && (
                <Text style={pdfStyles.contactSeparator}>•</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
