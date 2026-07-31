import type { AchievementEntry } from "../../../types/resume.types";

interface AchievementsPreviewProps {
  title: string;
  data: AchievementEntry[];
}

export function AchievementsPreview({ title, data }: AchievementsPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <ul className="list-disc list-inside space-y-0.5 text-xs text-zinc-700 leading-snug">
        {data
          .filter((item) => item.text && item.text.trim())
          .map((item) => (
            <li key={item.id} data-item-id={item.id} className="pl-0.5">
              <span>{item.text}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
