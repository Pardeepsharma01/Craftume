"use client";

import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { SummarySectionData } from "../../types/resume.types";

interface SummaryFormProps {
  sectionId: string;
  data: SummarySectionData;
}

export function SummaryForm({ sectionId, data }: SummaryFormProps) {
  const dispatch = useAppDispatch();

  const handleChange = (content: string) => {
    dispatch(
      updateSectionData({
        sectionId,
        data: { content },
      })
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-foreground">
        Professional Summary / Profile Statement
      </label>
      <textarea
        rows={4}
        value={data.content || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g. Results-driven Senior Software Engineer with 6+ years of experience designing high-throughput microservices and AI-assisted web applications..."
        className="w-full rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors leading-relaxed"
      />
      <p className="text-[11px] text-muted-foreground">
        Tip: Highlight your core expertise, years of experience, and top technical achievements in 2–4 sentences.
      </p>
    </div>
  );
}
