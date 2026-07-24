"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileCheck } from "lucide-react";
import { fadeUpHero, staggerContainer, buttonTap } from "@/lib/motion-variants";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-transparent pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUpHero}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-primary shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          AI-Powered · ATS-Optimized · PDF Export
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          variants={fadeUpHero}
          className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Build Resumes That{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Beat the ATS
          </span>
          {" "}and Win Interviews
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUpHero}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          Craftume combines an intelligent resume builder with a real-time ATS
          scorer. Fill in your details, get instant AI feedback, and download a
          polished PDF — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUpHero}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div {...buttonTap}>
            <Link
              href="/auth/sign-up"
              id="hero-cta-primary"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.45)]"
            >
              Build Your Resume
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div {...buttonTap}>
            <Link
              href="/auth/sign-up"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/30 backdrop-blur-md px-8 py-3.5 text-base font-semibold text-foreground shadow-sm transition-all duration-300 hover:bg-card/50 hover:border-primary/40 hover:text-primary"
            >
              <FileCheck className="h-4 w-4" aria-hidden="true" />
              Check My ATS Score
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof line */}
        <motion.p
          variants={fadeUpHero}
          className="mt-8 text-sm text-muted-foreground"
        >
          Free to start · No credit card required · Takes under 5 minutes
        </motion.p>
      </motion.div>
    </section>
  );
}
