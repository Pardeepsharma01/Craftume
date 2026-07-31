"use client";

import { Plus, Trash2, Layers } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { CustomSectionItem } from "../../types/resume.types";

interface CustomSectionFormProps {
  sectionId: string;
  data: CustomSectionItem[];
}

export function CustomSectionForm({ sectionId, data }: CustomSectionFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: CustomSectionItem[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: CustomSectionItem = {
      id: crypto.randomUUID(),
      label: "",
      value: "",
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, fields: Partial<CustomSectionItem>) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-4">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No custom items added yet. Click &quot;Add Custom Item&quot; below.
        </p>
      )}

      {data.map((entry, index) => (
        <div key={entry.id} className="relative rounded-2xl border border-border/80 bg-card/40 p-3.5 space-y-2">
          <div className="flex justify-between items-center pb-1">
            <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3 w-3 text-primary" />
              Item #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveEntry(entry.id)}
              className="text-[11px] text-destructive/80 hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <input
              type="text"
              value={entry.label}
              onChange={(e) => handleChangeEntry(entry.id, { label: e.target.value })}
              placeholder="Label / Heading (e.g. Patent US-1029)"
              className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={entry.value}
              onChange={(e) => handleChangeEntry(entry.id, { value: e.target.value })}
              placeholder="Details / Description"
              className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddEntry}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors"
      >
        <Plus className="h-4 w-4" /> Add Custom Item
      </button>
    </div>
  );
}
