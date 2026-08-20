"use client";

import { Plus, Trash2, Trophy } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { AchievementEntry } from "../../types/resume.types";

interface AchievementsFormProps {
  sectionId: string;
  data: AchievementEntry[];
}

export function AchievementsForm({ sectionId, data }: AchievementsFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: AchievementEntry[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: AchievementEntry = {
      id: crypto.randomUUID(),
      text: "",
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, text: string) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  return (
    <div className="space-y-4">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No honors or achievements added yet. Click &quot;Add Achievement&quot; below.
        </p>
      )}

      {data.map((entry, index) => (
        <div key={entry.id} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
            <Trophy className="h-3.5 w-3.5" />
          </div>
          <input
            type="text"
            value={entry.text}
            onChange={(e) => handleChangeEntry(entry.id, e.target.value)}
            placeholder={`Achievement #${index + 1} (e.g. 1st Place Global Hackathon 2024)`}
            className="flex-1 rounded-xl border border-border bg-card/60 px-3.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => handleRemoveEntry(entry.id)}
            className="text-xs text-destructive/80 hover:text-destructive p-2 transition-colors"
            title="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddEntry}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors"
      >
        <Plus className="h-4 w-4" /> Add Achievement Item
      </button>
    </div>
  );
}
