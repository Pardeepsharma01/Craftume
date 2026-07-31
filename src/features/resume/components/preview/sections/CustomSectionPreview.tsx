import type { CustomSectionItem } from "../../../types/resume.types";

interface CustomSectionPreviewProps {
  title: string;
  data: CustomSectionItem[];
}

export function CustomSectionPreview({ title, data }: CustomSectionPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="space-y-1 text-xs text-zinc-800 leading-snug">
        {data.map((item) => (
          <div key={item.id} data-item-id={item.id} className="flex justify-between items-baseline gap-2">
            {item.label && <span className="font-bold text-zinc-900">{item.label}</span>}
            {item.value && <span className="text-zinc-700">{item.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
