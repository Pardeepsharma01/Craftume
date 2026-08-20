import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ResumeData,
  ResumeSection,
  PersonalInfo,
} from "@/features/resume/types/resume.types";

export interface ResumeState {
  currentResume: ResumeData | null;
  /**
   * resumeId: the database row id for the currently loaded resume.
   * We use the same value as ResumeData.id (single source of truth — no
   * separate client vs DB ID to track). Set after first successful create,
   * cleared on resetResume.
   */
  resumeId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  /** Non-null when the last autosave/manual save failed — displayed in UI. */
  saveError: string | null;
}

const initialState: ResumeState = {
  currentResume: null,
  resumeId: null,
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
  saveError: null,
};

/**
 * Helper to mark resume state as modified by user, updating timestamp,
 * marking state dirty, and flipping isSampleData to false.
 */
function applyResumeEdit(state: ResumeState) {
  if (!state.currentResume) return;
  if (state.currentResume.isSampleData) {
    state.currentResume.isSampleData = false;
  }
  state.currentResume.updatedAt = new Date().toISOString();
  state.isDirty = true;
}

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResume(state, action: PayloadAction<ResumeData>) {
      state.currentResume = action.payload;
      // If it's sample data (not saved in DB yet), resumeId is null until first autosave.
      // Otherwise, set resumeId to match action.payload.id.
      state.resumeId = action.payload.isSampleData ? null : action.payload.id;
      state.isDirty = false;
      state.isSaving = false;
      state.saveError = null;
    },

    /**
     * Set the DB row id after a successful create or when loading an
     * existing resume. Since ResumeData.id === DB row id, this doubles
     * as the resumeId — we store it explicitly in state so selectors/hooks
     * can read it without deriving from currentResume (which may be null).
     */
    setResumeId(state, action: PayloadAction<string>) {
      state.resumeId = action.payload;
    },

    setSaveError(state, action: PayloadAction<string | null>) {
      state.saveError = action.payload;
    },

    updatePersonalInfo(state, action: PayloadAction<Partial<PersonalInfo>>) {
      if (!state.currentResume) return;
      state.currentResume.personalInfo = {
        ...state.currentResume.personalInfo,
        ...action.payload,
      };
      applyResumeEdit(state);
    },

    addSection(state, action: PayloadAction<ResumeSection>) {
      if (!state.currentResume) return;
      const nextOrder = state.currentResume.sections.length;
      const newSection = { ...action.payload, order: nextOrder };
      state.currentResume.sections.push(newSection);
      applyResumeEdit(state);
    },

    removeSection(state, action: PayloadAction<string>) {
      if (!state.currentResume) return;
      state.currentResume.sections = state.currentResume.sections
        .filter((sec) => sec.id !== action.payload)
        .map((sec, idx) => ({ ...sec, order: idx }));
      applyResumeEdit(state);
    },

    reorderSections(state, action: PayloadAction<string[]>) {
      if (!state.currentResume) return;
      const orderedIds = action.payload;
      const sectionMap = new Map(
        state.currentResume.sections.map((sec) => [sec.id, sec])
      );

      const reordered: ResumeSection[] = [];
      orderedIds.forEach((id, index) => {
        const sec = sectionMap.get(id);
        if (sec) {
          reordered.push({ ...sec, order: index });
          sectionMap.delete(id);
        }
      });

      // Append any remaining sections that weren't in orderedIds
      sectionMap.forEach((sec) => {
        reordered.push({ ...sec, order: reordered.length });
      });

      state.currentResume.sections = reordered;
      applyResumeEdit(state);
    },

    updateSectionData(
      state,
      action: PayloadAction<{ sectionId: string; data: unknown }>
    ) {
      if (!state.currentResume) return;
      const section = state.currentResume.sections.find(
        (sec) => sec.id === action.payload.sectionId
      );
      if (section) {
        // cast payload.data onto section.data safely in Redux state
        (section as { data: unknown }).data = action.payload.data;
        applyResumeEdit(state);
      }
    },

    toggleSectionVisibility(state, action: PayloadAction<string>) {
      if (!state.currentResume) return;
      const section = state.currentResume.sections.find(
        (sec) => sec.id === action.payload
      );
      if (section) {
        section.visible = !section.visible;
        applyResumeEdit(state);
      }
    },

    renameSectionTitle(
      state,
      action: PayloadAction<{ sectionId: string; title: string }>
    ) {
      if (!state.currentResume) return;
      const section = state.currentResume.sections.find(
        (sec) => sec.id === action.payload.sectionId
      );
      if (section) {
        section.title = action.payload.title;
        applyResumeEdit(state);
      }
    },

    markDirty(state) {
      state.isDirty = true;
    },

    markClean(state) {
      state.isDirty = false;
      state.lastSavedAt = new Date().toISOString();
      state.saveError = null;
    },

    setSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },

    resetResume(state) {
      state.currentResume = null;
      state.resumeId = null;
      state.isDirty = false;
      state.isSaving = false;
      state.lastSavedAt = null;
      state.saveError = null;
    },
  },
});

export const {
  setResume,
  setResumeId,
  setSaveError,
  updatePersonalInfo,
  addSection,
  removeSection,
  reorderSections,
  updateSectionData,
  toggleSectionVisibility,
  renameSectionTitle,
  markDirty,
  markClean,
  setSaving,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
