"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "ATS Checker", href: "#ats-showcase" },
  { label: "Pricing", href: "#pricing" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-craftume-border bg-craftume-surface/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-navbar max-w-container items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-craftume-heading font-bold text-xl tracking-tight transition-opacity duration-fast hover:opacity-80"
        >
          <Sparkles
            className="h-5 w-5 text-craftume-primary"
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
                className="text-sm font-medium text-craftume-text-muted transition-colors duration-fast hover:text-craftume-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-craftume-text transition-colors duration-fast hover:text-craftume-primary"
          >
            Sign In
          </Link>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/sign-up"
              className="rounded-lg bg-craftume-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-fast hover:bg-craftume-primary-hover"
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
          className="flex md:hidden items-center justify-center rounded-lg p-2 text-craftume-text-muted transition-colors duration-fast hover:text-craftume-primary"
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
            className="overflow-hidden border-b border-craftume-border bg-craftume-surface md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-craftume-text transition-colors duration-fast hover:bg-craftume-surface-alt hover:text-craftume-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex flex-col gap-2 border-t border-craftume-border pt-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-craftume-text transition-colors duration-fast hover:bg-craftume-surface-alt"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-craftume-primary px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-fast hover:bg-craftume-primary-hover"
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
