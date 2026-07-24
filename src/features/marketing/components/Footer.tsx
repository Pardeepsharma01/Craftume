import Link from "next/link";
import { Sparkles } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "ATS Checker", href: "#ats-showcase" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
} as const;

export function Footer() {
  const year = 2026; // Update annually — new Date() is forbidden in statically prerendered Server Components (Next.js 16)

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-background/60 backdrop-blur-md"
    >
      <div className="mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground font-bold text-lg transition-opacity duration-200 hover:opacity-75"
            >
              <Sparkles
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              Craftume
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              AI-powered resume builder and ATS checker. Build job-ready
              resumes that pass every filter.
            </p>
          </div>

          {/* Link columns */}
          {(Object.keys(FOOTER_LINKS) as Array<keyof typeof FOOTER_LINKS>).map(
            (category) => (
              <div key={category}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  {category}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5" role="list">
                  {FOOTER_LINKS[category].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Craftume. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Supabase &amp; ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
