"use client";

import { Plus, Trash2, Wrench } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { SkillCategory } from "../../types/resume.types";

interface SkillsFormProps {
  sectionId: string;
  data: SkillCategory[];
}

export function SkillsForm({ sectionId, data }: SkillsFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: SkillCategory[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      id: crypto.randomUUID(),
      categoryName: "",
      skills: [],
    };
    handleUpdate([...data, newCategory]);
  };

  const handleRemoveCategory = (id: string) => {
    handleUpdate(data.filter((cat) => cat.id !== id));
  };

  const handleChangeCategory = (id: string, fields: Partial<SkillCategory>) => {
    handleUpdate(
      data.map((cat) => (cat.id === id ? { ...cat, ...fields } : cat))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No skill categories added yet. Click &quot;Add Skill Category&quot; below.
        </p>
      )}

      {data.map((category, index) => (
        <div
          key={category.id}
          className="relative rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-2">
              <Wrench className="h-3.5 w-3.5 text-primary" />
              Skill Category #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveCategory(category.id)}
              className="text-xs text-destructive/80 hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Category Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Category Name *</label>
              <input
                type="text"
                value={category.categoryName}
                onChange={(e) => handleChangeCategory(category.id, { categoryName: e.target.value })}
                placeholder="e.g. Frontend Development, Languages, DevOps"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Skills Array */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-muted-foreground">
                Skills in this Category (Comma-separated) *
              </label>
              <input
                type="text"
                value={(category.skills || []).join(", ")}
                onChange={(e) =>
                  handleChangeCategory(category.id, {
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="React, Next.js, TypeScript, Tailwind CSS, Redux Toolkit"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddCategory}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors"
      >
        <Plus className="h-4 w-4" /> Add Skill Category
      </button>
    </div>
  );
}
