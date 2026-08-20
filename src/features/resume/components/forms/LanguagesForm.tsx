"use client";

import { Plus, Trash2, Languages } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { LanguageEntry } from "../../types/resume.types";

interface LanguagesFormProps {
  sectionId: string;
  data: LanguageEntry[];
}

const PROFICIENCY_OPTIONS = ["Native", "Fluent", "Proficient", "Intermediate", "Basic"];

export function LanguagesForm({ sectionId, data }: LanguagesFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: LanguageEntry[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: LanguageEntry = {
      id: crypto.randomUUID(),
      name: "",
      proficiency: "Fluent",
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, fields: Partial<LanguageEntry>) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No languages added yet. Click &quot;Add Language&quot; below.
        </p>
      )}

      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="relative rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-2">
              <Languages className="h-3.5 w-3.5 text-primary" />
              Language #{index + 1}
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
            {/* Language Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Language Name *</label>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => handleChangeEntry(entry.id, { name: e.target.value })}
                placeholder="e.g. English, Spanish, German"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Proficiency Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Proficiency Level</label>
              <select
                value={entry.proficiency}
                onChange={(e) => handleChangeEntry(entry.id, { proficiency: e.target.value })}
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {PROFICIENCY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-card text-foreground">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddEntry}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors"
      >
        <Plus className="h-4 w-4" /> Add Language Entry
      </button>
    </div>
  );
}
