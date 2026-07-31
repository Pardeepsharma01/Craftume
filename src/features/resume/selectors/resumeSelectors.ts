import type { RootState } from "@/redux/store";

export const selectCurrentResume = (state: RootState) =>
  state.resume.currentResume;

export const selectSortedSections = (state: RootState) => {
  const sections = state.resume.currentResume?.sections;
  if (!sections || sections.length === 0) return [];
  // Return original array reference if already sequentially ordered
  let isSorted = true;
  for (let i = 0; i < sections.length - 1; i++) {
    if (sections[i].order > sections[i + 1].order) {
      isSorted = false;
      break;
    }
  }
  if (isSorted) return sections;
  return [...sections].sort((a, b) => a.order - b.order);
};

export const selectPersonalInfo = (state: RootState) =>
  state.resume.currentResume?.personalInfo ?? null;

export const selectIsDirty = (state: RootState) => state.resume.isDirty;

export const selectIsSaving = (state: RootState) => state.resume.isSaving;

export const selectLastSavedAt = (state: RootState) => state.resume.lastSavedAt;
