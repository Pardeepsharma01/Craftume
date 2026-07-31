"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FileDown, Loader2 } from "lucide-react";
import type { ResumeData } from "../../types/resume.types";
import { ResumePDFDocument } from "./ResumePDFDocument";

/**
 * PDFDownloadLink must be imported dynamically (no SSR) because react-pdf
 * uses browser-only APIs internally. This avoids "window is not defined"
 * errors during Next.js server rendering.
 */
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface PDFExportButtonProps {
  resume: ResumeData;
}

/**
 * PDFExportButton — wraps react-pdf's PDFDownloadLink.
 * ⚠️  DEBUG / TEMPORARY — this button is for testing the PDF skeleton only.
 * It will be replaced with a production-ready export action in a later phase.
 */
export function PDFExportButton({ resume }: PDFExportButtonProps) {
  // Avoid SSR hydration mismatch — only render after client mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400 opacity-70"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Loading PDF engine...
      </button>
    );
  }

  const fileName = `${(resume.personalInfo.fullName || "resume")
    .toLowerCase()
    .replace(/\s+/g, "-")}-resume.pdf`;

  return (
    <PDFDownloadLink
      document={<ResumePDFDocument resume={resume} />}
      fileName={fileName}
    >
      {({ loading }: { loading: boolean }) => (
        <button
          type="button"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 text-xs font-bold text-amber-400 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <FileDown className="h-3.5 w-3.5" />
              ⚠ Test PDF Export (Debug)
            </>
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
}
