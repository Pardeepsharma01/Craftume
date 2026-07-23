"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileCheck } from "lucide-react";

/** Easing used for all hero entrance animations */
const EASE = "easeOut" as const;

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-craftume-bg pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Subtle radial gradient glow behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="h-[600px] w-[900px] rounded-full bg-craftume-primary opacity-[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-craftume-border bg-craftume-surface px-4 py-1.5 text-xs font-semibold text-craftume-primary shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-craftume-primary" />
          AI-Powered · ATS-Optimized · PDF Export
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-craftume-heading sm:text-5xl lg:text-6xl"
        >
          Build Resumes That{" "}
          <span className="text-craftume-primary">Beat the ATS</span>
          {" "}and Win Interviews
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-lg text-craftume-text-muted leading-relaxed"
        >
          Craftume combines an intelligent resume builder with a real-time ATS
          scorer. Fill in your details, get instant AI feedback, and download a
          polished PDF — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/auth/sign-up"
              id="hero-cta-primary"
              className="inline-flex items-center gap-2 rounded-xl bg-craftume-primary px-7 py-3.5 text-base font-semibold text-white shadow-md transition-colors duration-fast hover:bg-craftume-primary-hover"
            >
              Build Your Resume
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/auth/sign-up"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-xl border border-craftume-border bg-craftume-surface px-7 py-3.5 text-base font-semibold text-craftume-text shadow-sm transition-colors duration-fast hover:border-craftume-primary hover:text-craftume-primary"
            >
              <FileCheck className="h-4 w-4" aria-hidden="true" />
              Check My ATS Score
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45, ease: EASE }}
          className="mt-8 text-sm text-craftume-text-muted"
        >
          Free to start · No credit card required · Takes under 5 minutes
        </motion.p>
      </div>
    </section>
  );
}
