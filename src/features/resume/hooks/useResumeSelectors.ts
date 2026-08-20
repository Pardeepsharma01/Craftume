import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentResume,
  selectSortedSections,
  selectPersonalInfo,
  selectIsDirty,
  selectIsSaving,
  selectLastSavedAt,
  selectResumeId,
  selectSaveError,
} from "../selectors/resumeSelectors";

export function useResumeSelectors() {
  const currentResume = useAppSelector(selectCurrentResume);
  const sortedSections = useAppSelector(selectSortedSections);
  const personalInfo = useAppSelector(selectPersonalInfo);
  const isDirty = useAppSelector(selectIsDirty);
  const isSaving = useAppSelector(selectIsSaving);
  const lastSavedAt = useAppSelector(selectLastSavedAt);
  const resumeId = useAppSelector(selectResumeId);
  const saveError = useAppSelector(selectSaveError);

  return {
    currentResume,
    sortedSections,
    personalInfo,
    isDirty,
    isSaving,
    lastSavedAt,
    resumeId,
    saveError,
  };
}
