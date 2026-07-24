"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { buttonTap } from "@/lib/motion-variants";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "ATS Checker", href: "#ats-showcase" },
  { label: "Pricing", href: "#pricing" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-lg transition-colors duration-300 ${
        scrolled ? "bg-background/90 shadow-md" : "bg-background/60"
      }`}
    >
      <nav
        className="mx-auto flex h-navbar max-w-container items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground font-bold text-xl tracking-tight transition-opacity duration-200 hover:opacity-80"
        >
          <Sparkles
            className="h-5 w-5 text-primary"
            aria-hidden="true"
          />
          Craftume
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div {...buttonTap}>
            <Link
              href="/auth/login"
              className="rounded-full border border-border bg-card/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-card/50 hover:border-primary/40"
            >
              Sign In
            </Link>
          </motion.div>
          <motion.div {...buttonTap}>
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.45)]"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex md:hidden items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-card/50 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-border bg-card/30 px-3 py-2.5 text-center text-sm font-medium text-foreground transition-colors duration-200 hover:bg-card/50"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-2.5 text-center text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.45)]"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
