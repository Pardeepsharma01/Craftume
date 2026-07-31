import { StyleSheet } from "@react-pdf/renderer";

/**
 * PDF Styles — react-pdf StyleSheet
 * ====================================
 * Units are in points (pt) unless specified otherwise.
 * react-pdf's built-in <Page size="A4"> is 595.28pt x 841.89pt.
 *
 * Mapping from on-screen preview (96dpi px → pt at 72dpi):
 *   px * (72/96) = px * 0.75
 * On-screen: p-10 = 40px padding → 30pt
 * On-screen: text-xs = 12px → 9pt
 * On-screen: text-2xl = 24px → 18pt
 * On-screen: text-[11px] → ~8pt
 * On-screen: border-b section title → borderBottomWidth: 0.75
 *
 * Spacing design intent (matching on-screen preview density):
 *   - Between sections:           8pt  (section.marginTop)
 *   - Between entries in section: 6pt  (entryContainer.marginBottom)
 *   - Internal entry sub-items:   1-2pt
 */
export const pdfStyles = StyleSheet.create({
  // ── Page ──────────────────────────────────────────────────────────────────
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 36,
    paddingRight: 36,
    fontSize: 9,
    color: "#18181b", // zinc-900
    flexDirection: "column",
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#18181b",
    paddingBottom: 6,
    marginBottom: 4,
  },

  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "#18181b",
    lineHeight: 1.1,
  },

  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#3f3f46", // zinc-700
    marginTop: 3,
  },

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },

  contactItem: {
    fontSize: 7.5,
    color: "#52525b", // zinc-600
    fontFamily: "Helvetica",
  },

  contactSeparator: {
    fontSize: 7.5,
    color: "#a1a1aa", // zinc-400
    fontFamily: "Helvetica-Bold",
    marginLeft: 4,
    marginRight: 4,
  },

  // ── Section shared ────────────────────────────────────────────────────────
  /** Applied to every section outer wrapper for consistent vertical rhythm */
  section: {
    marginTop: 8,
  },

  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#18181b",
    borderBottomWidth: 0.75,
    borderBottomColor: "#d4d4d8", // zinc-300
    paddingBottom: 2,
    marginBottom: 4,
  },

  // ── Shared entry container (Experience, Education, Projects, Certs) ───────
  /** Uniform bottom margin between entries within a section */
  entryContainer: {
    marginBottom: 6,
  },

  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  entryPosition: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: "#18181b",
    flexShrink: 1,
  },

  entryCompanySeparator: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: "#3f3f46",
  },

  entryCompany: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: "#3f3f46", // zinc-700
  },

  entryDates: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#52525b", // zinc-600
    flexShrink: 0,
  },

  entryLocation: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#71717a", // zinc-500
    fontStyle: "italic",
    marginTop: 1,
  },

  // ── Bullet rows (Experience, Projects, Achievements) ─────────────────────
  bulletList: {
    marginTop: 2,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 1.5,
  },

  bulletSymbol: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#3f3f46",
    marginRight: 4,
    marginTop: 0.5,
    width: 8,
    flexShrink: 0,
  },

  bulletText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#3f3f46", // zinc-700
    flex: 1,
    lineHeight: 1.4,
    // Justify bullet text — most bullet points are long enough to wrap; justify
    // eliminates the ragged right edge that makes short-trailing lines look bad
    textAlign: "justify",
  },

  // ── Technologies / inline label+value rows ────────────────────────────────
  technologiesRow: {
    marginTop: 2,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  technologiesLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: "#27272a", // zinc-800
  },

  technologiesText: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#52525b",
  },

  // ── Summary section ───────────────────────────────────────────────────────
  summaryText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#3f3f46", // zinc-700
    lineHeight: 1.45,
    // Justify paragraph text so the right margin is even — meaningful on multi-line wrapping content
    textAlign: "justify",
  },

  // ── Skills section ────────────────────────────────────────────────────────
  skillsContainer: {
    flexDirection: "column",
  },

  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    marginBottom: 2,
  },

  skillCategoryName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#18181b", // zinc-900
  },

  skillList: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#3f3f46", // zinc-700
    flex: 1,
    lineHeight: 1.3,
  },

  // ── Projects section ──────────────────────────────────────────────────────
  projectName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: "#18181b",
    flexShrink: 1,
  },

  projectLinksRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexShrink: 0,
  },

  projectLink: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#3f3f46", // zinc-700
    textDecoration: "underline",
  },

  projectLinkSep: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#a1a1aa", // zinc-400
  },

  // ── Certifications section ────────────────────────────────────────────────
  /** Compact container: tighter entry rows for certs and custom items */
  compactContainer: {
    flexDirection: "column",
  },

  certEntry: {
    marginBottom: 4,
  },

  certName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: "#18181b",
    flexShrink: 1,
  },

  certOrg: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#3f3f46",
  },

  // ── Languages section ─────────────────────────────────────────────────────
  languagesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  languageItem: {
    flexDirection: "row",
    alignItems: "baseline",
    marginRight: 4,
    marginBottom: 2,
  },

  languageName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#18181b",
  },

  languageProficiency: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#52525b", // zinc-600
    marginLeft: 2,
  },

  languageSep: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#a1a1aa",
    marginLeft: 2,
  },

  // ── Custom section ────────────────────────────────────────────────────────
  customRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },

  customLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#18181b",
    flexShrink: 0,
    marginRight: 8,
  },

  customValue: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#3f3f46", // zinc-700
    flex: 1,
    textAlign: "right",
  },
});
