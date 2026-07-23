"use client";

import { motion } from "framer-motion";
import { ClipboardList, BrainCog, Download } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  cardHover,
  viewportOnce,
} from "@/lib/motion-variants";

const STEPS = [
  {
    id: "step-1",
    number: "01",
    icon: ClipboardList,
    title: "Fill In Your Details",
    description:
      "Use the guided, split-screen resume builder to enter your experience, education, skills, and more. Sections are fully dynamic — add or remove as needed.",
  },
  {
    id: "step-2",
    number: "02",
    icon: BrainCog,
    title: "AI Reviews & Scores",
    description:
      "Paste a job description. Our AI instantly scores your resume against ATS criteria and pinpoints exactly which sections need improvement — and why.",
  },
  {
    id: "step-3",
    number: "03",
    icon: Download,
    title: "Download Your Polished Resume",
    description:
      "Export a clean, selectable-text PDF that renders beautifully on screen and passes through ATS parsers without losing formatting.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-transparent py-24 sm:py-32"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Simple process
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Three steps to a job-ready resume
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            No complex setup. No learning curve. Start building in seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              {...cardHover}
              className="relative flex flex-col gap-5 rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
            >
              {/* Connector line (desktop only, between steps) */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-10 left-full hidden -translate-x-4 border-t-2 border-dashed border-border md:block z-10"
                  style={{ width: "calc(100% - 2rem)" }}
                />
              )}

              {/* Icon + number */}
              <div className="flex items-center justify-between">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary shadow-md">
                  <step.icon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-bold text-white"
                  >
                    {i + 1}
                  </span>
                </div>
                <span className="text-4xl font-black text-muted/50 select-none">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
