import type { ProjectEntry } from "../../../types/resume.types";

interface ProjectsPreviewProps {
  title: string;
  data: ProjectEntry[];
}

export function ProjectsPreview({ title, data }: ProjectsPreviewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
        {title}
      </h3>

      <div className="space-y-2.5">
        {data.map((item) => {
          const bullets = Array.isArray(item.description)
            ? item.description
            : item.description
            ? [String(item.description)]
            : [];

          return (
            <div key={item.id} data-item-id={item.id} className="space-y-0.5 leading-snug">
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-xs font-bold text-zinc-900">
                  {item.name || "Untitled Project"}
                </span>

                {/* Links */}
                <div className="flex items-center gap-2 text-[11px] text-zinc-600 shrink-0">
                  {item.githubUrl && (
                    <span className="underline text-zinc-700 font-medium">GitHub</span>
                  )}
                  {item.githubUrl && item.liveUrl && <span>•</span>}
                  {item.liveUrl && (
                    <span className="underline text-zinc-700 font-medium">Live Demo</span>
                  )}
                </div>
              </div>

              {bullets && bullets.length > 0 && (
                <ul className="list-disc list-inside space-y-0.5 pt-0.5 text-xs text-zinc-700 leading-snug">
                  {bullets
                    .filter((desc) => desc.trim().length > 0)
                    .map((desc, i) => (
                      <li key={i} className="pl-0.5">
                        <span>{desc.replace(/^[•\-\*\s]+/, "")}</span>
                      </li>
                    ))}
                </ul>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <p className="text-[11px] text-zinc-600 pt-0.5">
                  <span className="font-semibold text-zinc-800">Built with:</span>{" "}
                  {item.technologies.join(", ")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
