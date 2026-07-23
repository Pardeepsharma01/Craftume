"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="bg-craftume-surface-alt py-24 sm:py-32"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl bg-craftume-primary px-8 py-16 text-center shadow-xl sm:px-16"
        >
          {/* Background glow orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white opacity-[0.06] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-craftume-accent opacity-[0.12] blur-3xl"
          />

          <div className="relative">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Your dream job is one resume away.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
              Build a resume that stands out, passes every ATS filter, and gets
              you the interview. Start free — no credit card, no commitment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/auth/sign-up"
                  id="cta-section-primary"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-craftume-primary shadow-lg transition-opacity duration-fast hover:opacity-90"
                >
                  Start Building for Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
              <Link
                href="/auth/login"
                id="cta-section-secondary"
                className="text-sm font-medium text-white/75 transition-colors duration-fast hover:text-white"
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
