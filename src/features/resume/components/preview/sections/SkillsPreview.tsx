import type { SkillCategory } from "../../../types/resume.types";

interface SkillsPreviewProps {
  title: string;
  data: SkillCategory[];
}

export function SkillsPreview({ title, data }: SkillsPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="space-y-1 leading-snug">
        {data.map((cat) => (
          <div key={cat.id} data-item-id={cat.id} className="text-xs text-zinc-800">
            {cat.categoryName && (
              <span className="font-bold text-zinc-900 mr-1.5">
                {cat.categoryName}:
              </span>
            )}
            <span className="text-zinc-700">
              {(cat.skills || []).join(", ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
