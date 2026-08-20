import { useState, useEffect } from "react";

/**
 * Custom React hook that returns true only after the component has mounted on the client.
 * Use this to guard against SSR/CSR hydration mismatches for state derived from client-only storage or Redux auth state.
 */
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
