"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeUp, buttonTap, viewportOnce } from "@/lib/motion-variants";

export function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="bg-transparent py-24 sm:py-32"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur-2xl px-8 py-16 text-center shadow-2xl sm:px-16"
        >
          {/* Background glow orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent opacity-20 blur-3xl"
          />

          <div className="relative z-10">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Your dream job is one resume away.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Build a resume that stands out, passes every ATS filter, and gets
              you the interview. Start free — no credit card, no commitment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div {...buttonTap}>
                <Link
                  href="/auth/sign-up"
                  id="cta-section-primary"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.45)]"
                >
                  Start Building for Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
              <Link
                href="/auth/login"
                id="cta-section-secondary"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Already have an account? Sign in →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
