"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  cardHover,
  viewportOnce,
} from "@/lib/motion-variants";

/**
 * PLACEHOLDER testimonials — replace with real customer quotes before launch.
 * These are clearly fictional for development purposes.
 */
const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Craftume helped me rewrite my resume in under an hour. The ATS score jumped from 52 to 87 after following the suggestions — I got a callback within 48 hours.",
    name: "Priya M.",
    role: "Product Manager",
    company: "Series B Startup",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The live preview is a game-changer. I could see exactly how my resume would look as I typed. The PDF export is clean enough to share with anyone, not just recruiters.",
    name: "James K.",
    role: "Senior Software Engineer",
    company: "Fortune 500",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "I was skeptical another AI tool would help, but the section-by-section breakdown was eye-opening. It told me exactly which keywords my summary was missing.",
    name: "Amara L.",
    role: "UX Designer",
    company: "Design Agency",
    rating: 5,
  },
] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-craftume-warning text-craftume-warning"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 sm:py-32"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Early adopters
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Loved by job seekers
          </h2>
          <p className="mt-4 text-muted-foreground">
            Here&apos;s what early users had to say about Craftume.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.id}
              variants={fadeUp}
              {...cardHover}
              className="flex flex-col gap-5 rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
            >
              <StarRating count={t.rating} />
              <blockquote className="flex-1 text-sm text-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                {/* Avatar initials placeholder */}
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary"
                  aria-hidden="true"
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
