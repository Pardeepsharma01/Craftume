"use client";

import { Plus, Trash2, Award } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateSectionData } from "@/redux/slices/resumeSlice";
import type { CertificationEntry } from "../../types/resume.types";

interface CertificationsFormProps {
  sectionId: string;
  data: CertificationEntry[];
}

export function CertificationsForm({ sectionId, data }: CertificationsFormProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (updated: CertificationEntry[]) => {
    dispatch(updateSectionData({ sectionId, data: updated }));
  };

  const handleAddEntry = () => {
    const newEntry: CertificationEntry = {
      id: crypto.randomUUID(),
      name: "",
      organization: "",
      date: "",
      credentialUrl: "",
    };
    handleUpdate([...data, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    handleUpdate(data.filter((item) => item.id !== id));
  };

  const handleChangeEntry = (id: string, fields: Partial<CertificationEntry>) => {
    handleUpdate(
      data.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No certifications added yet. Click &quot;Add Certification&quot; below.
        </p>
      )}

      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="relative rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-primary" />
              Certification #{index + 1}
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
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Certification Name *</label>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => handleChangeEntry(entry.id, { name: e.target.value })}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Organization */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Issuing Organization *</label>
              <input
                type="text"
                value={entry.organization}
                onChange={(e) => handleChangeEntry(entry.id, { organization: e.target.value })}
                placeholder="e.g. Amazon Web Services"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Date Issued</label>
              <input
                type="text"
                value={entry.date}
                onChange={(e) => handleChangeEntry(entry.id, { date: e.target.value })}
                placeholder="e.g. Mar 2024"
                className="w-full rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Credential URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Credential Verification URL</label>
              <input
                type="url"
                value={entry.credentialUrl || ""}
                onChange={(e) => handleChangeEntry(entry.id, { credentialUrl: e.target.value })}
                placeholder="https://credly.com/org/aws/badge"
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
        <Plus className="h-4 w-4" /> Add Certification Entry
      </button>
    </div>
  );
}
