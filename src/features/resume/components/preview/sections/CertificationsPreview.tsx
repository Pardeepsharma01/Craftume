import type { CertificationEntry } from "../../../types/resume.types";

interface CertificationsPreviewProps {
  title: string;
  data: CertificationEntry[];
}

export function CertificationsPreview({ title, data }: CertificationsPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="space-y-1 leading-snug">
        {data.map((item) => (
          <div key={item.id} data-item-id={item.id} className="flex justify-between items-baseline text-xs gap-2">
            <div>
              <span className="font-bold text-zinc-900">{item.name || "Certification"}</span>
              {item.organization && (
                <span className="font-medium text-zinc-700"> — {item.organization}</span>
              )}
            </div>
            {item.date && (
              <span className="text-[11px] text-zinc-600 shrink-0 font-medium">{item.date}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
