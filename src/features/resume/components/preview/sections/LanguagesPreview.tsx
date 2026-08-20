import type { LanguageEntry } from "../../../types/resume.types";

interface LanguagesPreviewProps {
  title: string;
  data: LanguageEntry[];
}

export function LanguagesPreview({ title, data }: LanguagesPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-zinc-800 leading-snug">
        {data.map((item) => (
          <div key={item.id} data-item-id={item.id} className="flex items-center gap-1">
            <span className="font-bold text-zinc-900">{item.name}</span>
            {item.proficiency && (
              <span className="text-zinc-600">({item.proficiency})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
