"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { buttonTap } from "@/lib/motion-variants";
import type { ResumeData } from "../../types/resume.types";
import { ResumePDFDocument } from "./ResumePDFDocument";

/**
 * PDFDownloadLink must be imported dynamically (no SSR) because react-pdf
 * relies on browser-only APIs. This prevents "window is not defined" errors
 * during Next.js server rendering.
 */
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface DownloadPDFButtonProps {
  resume: ResumeData;
}

/**
 * Sanitise a string for use as a filename:
 *  - Trim whitespace
 *  - Replace spaces/hyphens/underscores runs with a single underscore
 *  - Strip any characters that aren't alphanumeric, underscore, or hyphen
 */
function sanitiseFilename(raw: string): string {
  return raw
    .trim()
    .replace(/[\s\-_]+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "")
    .replace(/_+/g, "_") // collapse any double underscores left over
    .replace(/^_|_$/g, "") // strip leading/trailing underscores
    || "Resume"; // fallback if everything was stripped
}

/** DownloadPDFButton — production-ready PDF export action */
export function DownloadPDFButton({ resume }: DownloadPDFButtonProps) {
  // Avoid SSR hydration mismatch — only render PDFDownloadLink after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const nameSlug = sanitiseFilename(resume.personalInfo.fullName || "Resume");
  const fileName = `${nameSlug}_Resume.pdf`;

  // Skeleton shown server-side and during hydration
  if (!mounted) {
    return (
      <motion.button
        disabled
        aria-disabled="true"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold text-white shadow-lg opacity-70 cursor-wait select-none"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        <span>Loading PDF…</span>
      </motion.button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDFDocument resume={resume} />}
      fileName={fileName}
    >
      {({ loading }: { loading: boolean }) => (
        <motion.button
          type="button"
          disabled={loading}
          aria-disabled={loading}
          aria-label={loading ? "Preparing PDF, please wait" : "Download resume as PDF"}
          {...buttonTap}
          className={[
            "inline-flex items-center gap-2 rounded-full",
            "bg-gradient-to-r from-primary to-secondary",
            "px-4 py-2 text-xs font-semibold text-white",
            "shadow-lg transition-all duration-300",
            "hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)]",
            "disabled:opacity-60 disabled:cursor-wait disabled:pointer-events-none",
            "select-none cursor-pointer",
          ].join(" ")}
        >
          {loading ? (
            <>
              <Loader2
                className="h-3.5 w-3.5 animate-spin"
                aria-hidden="true"
              />
              <span>Preparing PDF…</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </>
          )}
        </motion.button>
      )}
    </PDFDownloadLink>
  );
}
