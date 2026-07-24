"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

/**
 * ReduxProvider
 * =============
 * Client-side wrapper that makes the Redux store available to the
 * component tree. Must be a Client Component ("use client") because
 * Next.js App Router Server Components cannot hold mutable state.
 *
 * Usage: wrap children with this in the root layout.
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
