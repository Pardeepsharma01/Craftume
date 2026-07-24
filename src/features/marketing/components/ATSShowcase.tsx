"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  fadeUp,
  scaleIn,
  buttonTap,
  cardHover,
  viewportOnce,
} from "@/lib/motion-variants";

/** Visual score ring — pure SVG, animated via scaleIn preset */
function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative flex h-36 w-36 items-center justify-center"
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-border"
        />
        {/* Progress */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          className="stroke-primary transition-all duration-700"
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-black text-foreground tabular-nums">
          {score}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          / 100
        </span>
      </div>
    </motion.div>
  );
}

type SuggestionType = "error" | "warning" | "success";

interface Suggestion {
  id: string;
  type: SuggestionType;
  section: string;
  message: string;
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: "s1",
    type: "error",
    section: "Summary",
    message: "Missing target job title keywords from job description",
  },
  {
    id: "s2",
    type: "warning",
    section: "Work Experience",
    message: "Quantify achievements — add metrics (%, $, or counts)",
  },
  {
    id: "s3",
    type: "success",
    section: "Skills",
    message: "Good match — 8 of 12 required keywords found",
  },
  {
    id: "s4",
    type: "warning",
    section: "Education",
    message: "Consider adding relevant coursework or GPA if above 3.5",
  },
];

const ICON_MAP: Record<SuggestionType, React.ElementType> = {
  error: AlertCircle,
  warning: TrendingUp,
  success: CheckCircle2,
};

const COLOR_MAP: Record<SuggestionType, string> = {
  error: "text-craftume-error",
  warning: "text-craftume-warning",
  success: "text-craftume-success",
};

const BG_MAP: Record<SuggestionType, string> = {
  error: "bg-craftume-error/10",
  warning: "bg-craftume-warning/10",
  success: "bg-craftume-success/10",
};

export function ATSShowcase() {
  return (
    <section
      id="ats-showcase"
      aria-labelledby="ats-showcase-heading"
      className="bg-transparent py-24 sm:py-32"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left: copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Key differentiator
            </p>
            <h2
              id="ats-showcase-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Know exactly why your resume gets rejected
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Most candidates never know why their applications disappear.
              Craftume&apos;s ATS Checker scans your resume against the job
              description, scores it out of 100, and delivers precise
              section-by-section feedback — so you fix the right things.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Upload any resume (PDF or DOCX)",
                "Paste the job description you're targeting",
                "Get an AI-generated score in seconds",
                "See exactly which sections need work",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-craftume-success"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <motion.div className="mt-8" {...buttonTap}>
              <Link
                href="/auth/sign-up"
                id="ats-cta"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.45)]"
              >
                Try the ATS Checker Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: mock ATS report card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            {...cardHover}
            className="rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]"
            role="img"
            aria-label="Sample ATS score report showing a score of 64 out of 100 with section suggestions"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  ATS Report
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  Software Engineer — Acme Corp
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-craftume-warning/15 px-2.5 py-0.5 text-xs font-semibold text-craftume-warning">
                Needs Work
              </span>
            </div>

            {/* Score ring + label */}
            <div className="my-6 flex flex-col items-center gap-2">
              <ScoreRing score={64} />
              <p className="text-sm text-muted-foreground">
                ATS Compatibility Score
              </p>
            </div>

            {/* Section suggestions */}
            <div
              className="flex flex-col gap-2.5"
              role="list"
              aria-label="Section suggestions"
            >
              {SUGGESTIONS.map((s) => {
                const Icon = ICON_MAP[s.type];
                return (
                  <div
                    key={s.id}
                    role="listitem"
                    className={`flex items-start gap-3 rounded-2xl p-3 backdrop-blur-sm ${BG_MAP[s.type]}`}
                  >
                    <Icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${COLOR_MAP[s.type]}`}
                      aria-hidden="true"
                    />
                    <div>
                      <span
                        className={`text-xs font-bold ${COLOR_MAP[s.type]}`}
                      >
                        {s.section}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {s.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
