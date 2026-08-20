"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trash2, X, AlertCircle, RotateCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResume } from "@/redux/slices/resumeSlice";
import { createEmptyResume } from "../utils/createEmptyResume";
import { fadeUp } from "@/lib/motion-variants";

export function SampleDataBanner() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearAll = () => {
    const userId = authUser?.id || "demo-user-123";
    dispatch(setResume(createEmptyResume(userId)));
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 backdrop-blur-xl p-4 sm:p-5 shadow-xl transition-all"
    >
      <AnimatePresence mode="wait">
        {!showConfirm ? (
          <motion.div
            key="banner-info"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/25 text-primary border border-primary/40 shadow-inner mt-0.5 sm:mt-0">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary">
                    Sample Resume Loaded
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary border border-primary/30">
                    Example Mode
                  </span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed max-w-xl">
                  This is sample content showing you the expected format and quality — edit any field to make it yours, or clear everything below to start fresh.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/20 hover:bg-primary/30 px-3.5 py-2 text-xs font-bold text-foreground transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5 text-primary" />
                <span>Clear All & Start Fresh</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="banner-confirm"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/50 p-3 sm:p-3.5 rounded-xl border border-primary/25"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Clear all sample content?</p>
                <p className="text-muted-foreground text-[11px]">
                  This will wipe all placeholder text and reset to a completely blank resume form.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/90 hover:bg-destructive px-3 py-1.5 text-xs font-bold text-destructive-foreground transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Yes, Clear All</span>
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-card/80 hover:bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
