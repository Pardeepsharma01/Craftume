import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Typed version of `useDispatch` — always use this instead of
 * plain `useDispatch` so async thunks are properly typed.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of `useSelector` — always use this instead of
 * plain `useSelector` to avoid manual type assertions.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
