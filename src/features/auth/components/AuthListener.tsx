"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/slices/authSlice";
import type { AuthUser } from "@/redux/slices/authSlice";

/**
 * AuthListener
 * ============
 * Mounts once at the root layout. Subscribes to Supabase's onAuthStateChange
 * so the Redux authSlice stays in sync with the actual session on every tab,
 * OAuth callback, token refresh, and sign-out.
 *
 * Renders nothing — purely side-effect logic.
 */
export function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const supabase = createClient();

    // Fire once on mount with the current session
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const authUser: AuthUser = {
          id: user.id,
          email: user.email ?? null,
          name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
          avatarUrl: user.user_metadata?.avatar_url ?? null,
        };
        dispatch(setUser(authUser));
      } else {
        dispatch(clearUser());
      }
    });

    // Subscribe to all future auth events (sign-in, sign-out, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email ?? null,
            name:
              session.user.user_metadata?.full_name ??
              session.user.user_metadata?.name ??
              null,
            avatarUrl: session.user.user_metadata?.avatar_url ?? null,
          };
          dispatch(setUser(authUser));
        } else {
          dispatch(clearUser());
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
}
