import type { ExperienceEntry } from "../../../types/resume.types";

interface ExperiencePreviewProps {
  title: string;
  data: ExperienceEntry[];
}

export function ExperiencePreview({ title, data }: ExperiencePreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="space-y-2.5">
        {data.map((item) => (
          <div key={item.id} data-item-id={item.id} className="space-y-0.5">
            {/* Header: Position & Dates */}
            <div className="flex justify-between items-baseline gap-2 leading-snug">
              <span className="text-xs font-bold text-zinc-900">
                {item.position || "Untitled Position"}{" "}
                {item.company && (
                  <span className="font-semibold text-zinc-700">| {item.company}</span>
                )}
              </span>
              <span className="text-[11px] font-medium text-zinc-600 shrink-0">
                {item.startDate}
                {item.startDate && (item.endDate || item.isCurrent) ? " – " : ""}
                {item.isCurrent ? "Present" : item.endDate}
              </span>
            </div>

            {/* Location */}
            {item.location && (
              <p className="text-[11px] font-medium text-zinc-500 italic leading-snug">
                {item.location}
              </p>
            )}

            {/* Responsibilities list */}
            {item.responsibilities && item.responsibilities.length > 0 && (
              <ul className="list-disc list-inside space-y-0.5 pt-0.5 text-xs text-zinc-700 leading-snug">
                {item.responsibilities
                  .filter((resp) => resp.trim().length > 0)
                  .map((resp, i) => (
                    <li key={i} className="pl-0.5">
                      <span>{resp.replace(/^[•\-\*\s]+/, "")}</span>
                    </li>
                  ))}
              </ul>
            )}

            {/* Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <p className="text-[11px] text-zinc-600 pt-0.5 leading-snug">
                <span className="font-semibold text-zinc-800">Technologies:</span>{" "}
                {item.technologies.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
