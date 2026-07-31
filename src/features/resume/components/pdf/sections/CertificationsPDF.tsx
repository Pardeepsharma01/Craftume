import { View, Text, Link } from "@react-pdf/renderer";
import type { CertificationEntry } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface CertificationsPDFProps {
  title: string;
  data: CertificationEntry[];
}

/**
 * Certifications section — PDF version.
 * Matches on-screen CertificationsPreview:
 *   [Name (bold) — Organization]              [Date]
 *   Credential: <clickable link> (if present)
 */
export function CertificationsPDF({ title, data }: CertificationsPDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      <View style={pdfStyles.compactContainer}>
        {data.map((item) => {
          const hasUrl = Boolean(item.credentialUrl && item.credentialUrl.trim());
          const credHref =
            hasUrl && item.credentialUrl
              ? item.credentialUrl.startsWith("http")
                ? item.credentialUrl
                : `https://${item.credentialUrl}`
              : "";

          return (
            <View key={item.id} style={pdfStyles.certEntry}>
              {/* Name + org ↔ date */}
              <View style={pdfStyles.entryHeaderRow}>
                <View style={{ flexDirection: "row", flexShrink: 1, flexWrap: "wrap", alignItems: "baseline" }}>
                  <Text style={pdfStyles.certName}>
                    {item.name || "Certification"}
                  </Text>
                  {item.organization && (
                    <>
                      <Text style={pdfStyles.entryCompanySeparator}>{" \u2014 "}</Text>
                      <Text style={pdfStyles.certOrg}>{item.organization}</Text>
                    </>
                  )}
                </View>
                {item.date && (
                  <Text style={pdfStyles.entryDates}>{item.date}</Text>
                )}
              </View>

              {/* Credential URL */}
              {hasUrl && (
                <View style={{ flexDirection: "row", marginTop: 1 }}>
                  <Text style={pdfStyles.technologiesLabel}>Credential: </Text>
                  <Link src={credHref} style={pdfStyles.projectLink}>
                    {item.credentialUrl}
                  </Link>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
