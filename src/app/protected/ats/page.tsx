"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Clock } from "lucide-react";
import { fadeUp, buttonTap } from "@/lib/motion-variants";

export default function ATSCheckerPlaceholderPage() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl py-12 text-center"
    >
      <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 shadow-inner">
          <Sparkles className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            <span>Feature Coming Soon</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ATS Score Checker
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The instant ATS scanner, keyword matching breakdown, and section-by-section suggestion engine will be built in the next phase.
          </p>
        </div>

        <motion.div {...buttonTap} className="inline-block pt-4">
          <Link
            href="/protected"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-card hover:border-secondary/40"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
