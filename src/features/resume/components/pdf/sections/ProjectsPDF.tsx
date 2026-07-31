import { View, Text, Link } from "@react-pdf/renderer";
import type { ProjectEntry } from "../../../types/resume.types";
import { pdfStyles } from "../pdfStyles";

interface ProjectsPDFProps {
  title: string;
  data: ProjectEntry[];
}

/**
 * Projects section — PDF version.
 * Matches on-screen ProjectsPreview:
 *   [Project Name (bold)]         [GitHub • Live Demo] (as clickable Links)
 *   • Bullet description line
 *   Built with: tech1, tech2
 */
export function ProjectsPDF({ title, data }: ProjectsPDFProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      {data.map((item) => {
        // Normalise description: on-screen preview handles both string[] and string
        const bullets = Array.isArray(item.description)
          ? item.description
          : item.description
          ? [String(item.description)]
          : [];

        const hasGithub = Boolean(item.githubUrl && item.githubUrl.trim());
        const hasLive = Boolean(item.liveUrl && item.liveUrl.trim());

        // Ensure URLs are fully qualified for react-pdf's Link
        const githubHref =
          hasGithub && item.githubUrl
            ? item.githubUrl.startsWith("http")
              ? item.githubUrl
              : `https://${item.githubUrl}`
            : "";
        const liveHref =
          hasLive && item.liveUrl
            ? item.liveUrl.startsWith("http")
              ? item.liveUrl
              : `https://${item.liveUrl}`
            : "";

        return (
          <View key={item.id} style={pdfStyles.entryContainer}>
            {/* Header row: [Name] ↔ [GitHub • Live Demo] */}
            <View style={pdfStyles.entryHeaderRow}>
              <Text style={pdfStyles.projectName}>
                {item.name || "Untitled Project"}
              </Text>

              {(hasGithub || hasLive) && (
                <View style={pdfStyles.projectLinksRow}>
                  {hasGithub && (
                    <Link src={githubHref} style={pdfStyles.projectLink}>
                      GitHub
                    </Link>
                  )}
                  {hasGithub && hasLive && (
                    <Text style={pdfStyles.projectLinkSep}>{"  \u2022  "}</Text>
                  )}
                  {hasLive && (
                    <Link src={liveHref} style={pdfStyles.projectLink}>
                      Live Demo
                    </Link>
                  )}
                </View>
              )}
            </View>

            {/* Description bullets */}
            {bullets.length > 0 && (
              <View style={pdfStyles.bulletList}>
                {bullets
                  .filter((desc) => desc.trim().length > 0)
                  .map((desc, i) => (
                    <View key={i} style={pdfStyles.bulletRow}>
                      <Text style={pdfStyles.bulletSymbol}>{"\u2022"}</Text>
                      <Text style={pdfStyles.bulletText}>
                        {desc.replace(/^[•\-\*\s]+/, "")}
                      </Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <View style={pdfStyles.technologiesRow}>
                <Text style={pdfStyles.technologiesLabel}>Built with: </Text>
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
