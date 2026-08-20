"use client";

import { Plus, Trash2, FolderKanban } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { ProjectEntry } from "../../types/resume.types";

interface ProjectsFormProps {
  sectionId: string;
  data: ProjectEntry[];
}

export function ProjectsForm({ sectionId, data }: ProjectsFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: ProjectEntry[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: ProjectEntry = {
      id: crypto.randomUUID(),
      name: "",
      description: [],
      technologies: [],
      githubUrl: "",
      liveUrl: "",
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, fields: Partial<ProjectEntry>) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No projects added yet. Click &quot;Add Project&quot; below to highlight your key projects.
        </p>
      )}

      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="relative rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-2">
              <FolderKanban className="h-3.5 w-3.5 text-primary" />
              Project #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveEntry(entry.id)}
              className="text-xs text-destructive/80 hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Project Name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">Project Name *</label>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => handleChangeEntry(entry.id, { name: e.target.value })}
                placeholder="e.g. Craftume — AI Resume Builder"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">
                Key Features & Highlights (One bullet point per line)
              </label>
              <textarea
                rows={3}
                value={(Array.isArray(entry.description) ? entry.description : entry.description ? [String(entry.description)] : []).join("\n")}
                onChange={(e) =>
                  handleChangeEntry(entry.id, {
                    description: e.target.value
                      .split("\n")
                      .filter((line) => line.trim().length > 0 || line === ""),
                  })
                }
                placeholder="• Architected microservices with 99.99% uptime&#10;• Implemented split-screen live preview with real-time DOM pagination&#10;• Reduced load times by 35% with dynamic component memoization"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              />
            </div>

            {/* Technologies */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">
                Technologies Used (Comma-separated)
              </label>
              <input
                type="text"
                value={(entry.technologies || []).join(", ")}
                onChange={(e) =>
                  handleChangeEntry(entry.id, {
                    technologies: e.target.value
                      .split(",")
                      .map((tech) => tech.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Next.js, TypeScript, Tailwind CSS, Supabase, Redux"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* GitHub URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">GitHub Repository URL</label>
              <input
                type="url"
                value={entry.githubUrl || ""}
                onChange={(e) => handleChangeEntry(entry.id, { githubUrl: e.target.value })}
                placeholder="https://github.com/user/project"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Live Demo URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Live Demo / App URL</label>
              <input
                type="url"
                value={entry.liveUrl || ""}
                onChange={(e) => handleChangeEntry(entry.id, { liveUrl: e.target.value })}
                placeholder="https://myproject.com"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddEntry}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors"
      >
        <Plus className="h-4 w-4" /> Add Project Entry
      </button>
    </div>
  );
}
