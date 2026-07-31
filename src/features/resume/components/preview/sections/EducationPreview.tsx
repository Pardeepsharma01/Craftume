import type { EducationEntry } from "../../../types/resume.types";

interface EducationPreviewProps {
  title: string;
  data: EducationEntry[];
}

export function EducationPreview({ title, data }: EducationPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.id} data-item-id={item.id} className="space-y-0.5 leading-snug">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-xs font-bold text-zinc-900">
                {item.degree || "Degree"}{" "}
                {item.institution && (
                  <span className="font-semibold text-zinc-700">| {item.institution}</span>
                )}
              </span>
              <span className="text-[11px] font-medium text-zinc-600 shrink-0">
                {item.startDate}
                {item.startDate && item.endDate ? " – " : ""}
                {item.endDate}
              </span>
            </div>

            {item.grade && (
              <p className="text-[11px] text-zinc-600">
                <span className="font-medium text-zinc-800">Grade / Honors:</span> {item.grade}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
