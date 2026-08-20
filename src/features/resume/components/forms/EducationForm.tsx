"use client";

import { Plus, Trash2, GraduationCap } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { EducationEntry } from "../../types/resume.types";

interface EducationFormProps {
  sectionId: string;
  data: EducationEntry[];
}

export function EducationForm({ sectionId, data }: EducationFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: EducationEntry[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: EducationEntry = {
      id: crypto.randomUUID(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      grade: "",
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, fields: Partial<EducationEntry>) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No education history added yet. Click &quot;Add Education&quot; below to add your degree.
        </p>
      )}

      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="relative rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              Education #{index + 1}
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
            {/* Degree */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Degree / Major *</label>
              <input
                type="text"
                value={entry.degree}
                onChange={(e) => handleChangeEntry(entry.id, { degree: e.target.value })}
                placeholder="e.g. B.S. in Computer Science"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Institution */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Institution / University *</label>
              <input
                type="text"
                value={entry.institution}
                onChange={(e) => handleChangeEntry(entry.id, { institution: e.target.value })}
                placeholder="e.g. Stanford University"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Dates */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Start Date</label>
              <input
                type="text"
                value={entry.startDate}
                onChange={(e) => handleChangeEntry(entry.id, { startDate: e.target.value })}
                placeholder="e.g. Sep 2018"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">End Date / Expected Graduation</label>
              <input
                type="text"
                value={entry.endDate || ""}
                onChange={(e) => handleChangeEntry(entry.id, { endDate: e.target.value })}
                placeholder="e.g. Jun 2022"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Grade / GPA */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">Grade / GPA / Honors (Optional)</label>
              <input
                type="text"
                value={entry.grade || ""}
                onChange={(e) => handleChangeEntry(entry.id, { grade: e.target.value })}
                placeholder="e.g. 3.9 / 4.0 GPA, Magna Cum Laude"
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
        <Plus className="h-4 w-4" /> Add Education Entry
      </button>
    </div>
  );
}
