"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  SplitSquareHorizontal,
  FileDown,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    id: "ats-score",
    icon: BrainCircuit,
    title: "AI ATS Score & Suggestions",
    description:
      "Upload your resume and a job description. Our AI engine scores it against real ATS criteria and gives you actionable, section-by-section improvements.",
  },
  {
    id: "live-preview",
    icon: SplitSquareHorizontal,
    title: "Live Resume Builder",
    description:
      "A split-screen editor lets you fill in your details on the left and see a pixel-perfect preview update in real time on the right. No surprises at export.",
  },
  {
    id: "pdf-export",
    icon: FileDown,
    title: "Clean PDF Export",
    description:
      "Download your resume as a real, selectable-text PDF — not a screenshot. Formatted with clean typography that looks great to both humans and ATS scanners.",
  },
  {
    id: "dynamic-sections",
    icon: Layers,
    title: "Dynamic Sections",
    description:
      "Add, remove, or reorder sections — Work Experience, Education, Projects, Skills, Certifications — without starting over. Your resume adapts to every role.",
  },
];

export function FeaturesGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-craftume-surface-alt py-24 sm:py-32"
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
            Everything you need
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-craftume-heading sm:text-4xl"
          >
            One platform. Two superpowers.
          </h2>
          <p className="mt-4 text-craftume-text-muted leading-relaxed">
            Most tools only do one thing. Craftume combines a professional
            resume builder with an AI ATS checker so you can create and
            validate — without switching apps.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
              className="group flex flex-col gap-4 rounded-xl border border-craftume-border bg-craftume-surface p-6 shadow-sm transition-shadow duration-normal"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-craftume-primary/10 transition-colors duration-normal group-hover:bg-craftume-primary/15">
                <feature.icon
                  className="h-5 w-5 text-craftume-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-base font-semibold text-craftume-heading">
                {feature.title}
              </h3>
              <p className="text-sm text-craftume-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
