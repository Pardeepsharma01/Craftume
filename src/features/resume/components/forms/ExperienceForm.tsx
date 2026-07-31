"use client";

import { Plus, Trash2, Calendar, MapPin, Building2, Briefcase, Code } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { ExperienceEntry } from "../../types/resume.types";

interface ExperienceFormProps {
  sectionId: string;
  data: ExperienceEntry[];
}

export function ExperienceForm({ sectionId, data }: ExperienceFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: ExperienceEntry[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: ExperienceEntry = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      responsibilities: [],
      technologies: [],
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, fields: Partial<ExperienceEntry>) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No work experience added yet. Click &quot;Add Experience&quot; below to add your first position.
        </p>
      )}

      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="relative rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              Position #{index + 1}
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
            {/* Position */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Job Title / Position *</label>
              <input
                type="text"
                value={entry.position}
                onChange={(e) => handleChangeEntry(entry.id, { position: e.target.value })}
                placeholder="e.g. Senior Software Engineer"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Company */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Company / Organization *</label>
              <input
                type="text"
                value={entry.company}
                onChange={(e) => handleChangeEntry(entry.id, { company: e.target.value })}
                placeholder="e.g. Stripe, TechCorp"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Location */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">Location</label>
              <input
                type="text"
                value={entry.location || ""}
                onChange={(e) => handleChangeEntry(entry.id, { location: e.target.value })}
                placeholder="e.g. San Francisco, CA (or Remote)"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Dates & Current Status */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Start Date</label>
              <input
                type="text"
                value={entry.startDate}
                onChange={(e) => handleChangeEntry(entry.id, { startDate: e.target.value })}
                placeholder="e.g. Jan 2022"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">End Date</label>
              <input
                type="text"
                disabled={entry.isCurrent}
                value={entry.isCurrent ? "Present" : entry.endDate || ""}
                onChange={(e) => handleChangeEntry(entry.id, { endDate: e.target.value })}
                placeholder="e.g. Present or Dec 2024"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id={`isCurrent-${entry.id}`}
                checked={entry.isCurrent}
                onChange={(e) =>
                  handleChangeEntry(entry.id, {
                    isCurrent: e.target.checked,
                    endDate: e.target.checked ? "Present" : "",
                  })
                }
                className="rounded border-border bg-card/60 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
              />
              <label
                htmlFor={`isCurrent-${entry.id}`}
                className="text-xs text-foreground cursor-pointer select-none font-medium"
              >
                I currently work here
              </label>
            </div>

            {/* Bullet Points Responsibilities */}
            <div className="space-y-1.5 sm:col-span-2 pt-2">
              <label className="text-[11px] font-semibold text-muted-foreground">
                Key Responsibilities & Achievements (One bullet point per line)
              </label>
              <textarea
                rows={3}
                value={(entry.responsibilities || []).join("\n")}
                onChange={(e) =>
                  handleChangeEntry(entry.id, {
                    responsibilities: e.target.value
                      .split("\n")
                      .filter((line) => line.trim().length > 0 || line === ""),
                  })
                }
                placeholder="• Architected microservices with 99.99% uptime&#10;• Led cross-functional team of 8 engineers&#10;• Reduced latency by 40% using Redis caching"
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
                placeholder="TypeScript, React, Next.js, Node.js, PostgreSQL, AWS"
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
        <Plus className="h-4 w-4" /> Add Experience Position
      </button>
    </div>
  );
}
