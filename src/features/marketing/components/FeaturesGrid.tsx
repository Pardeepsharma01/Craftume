"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  SplitSquareHorizontal,
  FileDown,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  cardHover,
  viewportOnce,
} from "@/lib/motion-variants";

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
            Everything you need
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            One platform. Two superpowers.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Most tools only do one thing. Craftume combines a professional
            resume builder with an AI ATS checker so you can create and
            validate — without switching apps.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={fadeUp}
              {...cardHover}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                <feature.icon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
