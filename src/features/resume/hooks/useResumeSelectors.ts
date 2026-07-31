import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentResume,
  selectSortedSections,
  selectPersonalInfo,
  selectIsDirty,
  selectIsSaving,
  selectLastSavedAt,
} from "../selectors/resumeSelectors";

export function useResumeSelectors() {
  const currentResume = useAppSelector(selectCurrentResume);
  const sortedSections = useAppSelector(selectSortedSections);
  const personalInfo = useAppSelector(selectPersonalInfo);
  const isDirty = useAppSelector(selectIsDirty);
  const isSaving = useAppSelector(selectIsSaving);
  const lastSavedAt = useAppSelector(selectLastSavedAt);

  return {
    currentResume,
    sortedSections,
    personalInfo,
    isDirty,
    isSaving,
    lastSavedAt,
  };
}
