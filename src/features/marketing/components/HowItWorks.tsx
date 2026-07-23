"use client";

import { motion } from "framer-motion";
import { ClipboardList, BrainCog, Download } from "lucide-react";

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
      className="bg-craftume-bg py-24 sm:py-32"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-craftume-primary">
            Simple process
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-craftume-heading sm:text-4xl"
          >
            Three steps to a job-ready resume
          </h2>
          <p className="mt-4 text-craftume-text-muted leading-relaxed">
            No complex setup. No learning curve. Start building in seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
              className="relative flex flex-col gap-5"
            >
              {/* Connector line (desktop only, between steps) */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-6 left-full hidden -translate-x-6 border-t-2 border-dashed border-craftume-border md:block"
                  style={{ width: "calc(100% - 3rem)" }}
                />
              )}

              {/* Icon + number */}
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-craftume-primary shadow-md">
                  <step.icon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-craftume-bg bg-craftume-secondary text-[10px] font-bold text-white"
                  >
                    {i + 1}
                  </span>
                </div>
                <span className="text-4xl font-black text-craftume-border select-none">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-craftume-heading">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-craftume-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
