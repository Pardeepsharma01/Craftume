import type { Metadata } from "next";
import { Navbar } from "@/features/marketing/components/Navbar";
import { Hero } from "@/features/marketing/components/Hero";
import { FeaturesGrid } from "@/features/marketing/components/FeaturesGrid";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
import { ATSShowcase } from "@/features/marketing/components/ATSShowcase";
import { Testimonials } from "@/features/marketing/components/Testimonials";
import { CTASection } from "@/features/marketing/components/CTASection";
import { Footer } from "@/features/marketing/components/Footer";

export const metadata: Metadata = {
  title: "Craftume — AI Resume Builder + ATS Checker",
  description:
    "Build ATS-optimized resumes with AI. Get an instant ATS score, section-by-section suggestions, and download a polished PDF. Free to start — no credit card required.",
  openGraph: {
    title: "Craftume — AI Resume Builder + ATS Checker",
    description:
      "Build ATS-optimized resumes with AI. Get an instant ATS score and download a polished PDF in minutes.",
    type: "website",
  },
};

/**
 * Craftume Marketing Landing Page
 * =================================
 * Server Component — only child components that need Framer Motion
 * or interactivity are marked "use client".
 */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      {/* Main content — pt-navbar pushes content below the fixed navbar */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <ATSShowcase />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
