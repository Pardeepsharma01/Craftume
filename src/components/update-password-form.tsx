"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeUp } from "@/lib/motion-variants";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // User already has an active session after updating password
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible">
      <div
        className={cn(
          "flex flex-col gap-6 rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-8 shadow-2xl",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Set new password
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a strong password for your account
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="update-password">New Password</Label>
            <Input
              id="update-password"
              type="password"
              placeholder="Minimum 6 characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full rounded-full px-6 py-2.5 text-sm font-semibold text-white
              bg-gradient-to-r from-primary to-secondary
              transition-all duration-300
              hover:scale-105 hover:shadow-lg hover:shadow-primary/25
              active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            {isLoading ? "Saving…" : "Save new password"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}