import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion animation variants and transition presets for Craftume.
 */

/** Scroll-triggered fade up animation for section headings and cards */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Hero section entrance animation with larger vertical displacement */
export const fadeUpHero: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/** Parent container variant that staggers child animations */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/** Hover & elevation preset to spread onto card motion components */
export const cardHover = {
  whileHover: { y: -8, scale: 1.02 },
  transition: { duration: 0.25 },
};

/** Hover & tap micro-interaction preset for CTA buttons */
export const buttonTap = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
};

/** Scale entrance variant for score indicators or badges */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Shared viewport configuration object to ensure animations fire once when scrolling into view */
export const viewportOnce = {
  once: true,
  margin: "-100px",
};
