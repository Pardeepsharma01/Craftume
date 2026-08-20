import type { SummarySectionData } from "../../../types/resume.types";

interface SummaryPreviewProps {
  title: string;
  data: SummarySectionData;
}

export function SummaryPreview({ title, data }: SummaryPreviewProps) {
  if (!data || !data.content || !data.content.trim()) return null;

  return (
    <div className="space-y-1">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>
      <p className="text-xs text-zinc-700 leading-snug whitespace-pre-wrap">
        {data.content}
      </p>
    </div>
  );
}
