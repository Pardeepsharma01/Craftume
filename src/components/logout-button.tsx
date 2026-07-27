"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // router.refresh() forces Next.js to invalidate its server-side route
    // cache so the middleware re-checks session state immediately.
    // Without this, a client-side push could briefly show stale authenticated
    // UI before the server confirms the session is gone.
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={logout}
      className="
        rounded-full border border-border bg-card/30 backdrop-blur-md
        px-4 py-1.5 text-sm font-medium text-foreground
        transition-all duration-200
        hover:bg-card/60 hover:border-primary/40
        active:scale-[0.98]
      "
    >
      Sign out
    </button>
  );
}