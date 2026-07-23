import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./proxy.ts",
  ],
  theme: {
    extend: {
      // ─── shadcn/Radix UI tokens (keep as-is for component library compat) ─────
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

        // ─── Craftume design token aliases (map to theme.css variables) ──────────
        // bg-craftume-primary, text-craftume-primary, etc.
        craftume: {
          primary: "hsl(var(--color-primary))",
          "primary-hover": "hsl(var(--color-primary-hover))",
          secondary: "hsl(var(--color-secondary))",
          accent: "hsl(var(--color-accent))",
          bg: "hsl(var(--color-bg))",
          surface: "hsl(var(--color-surface))",
          "surface-alt": "hsl(var(--color-surface-alt))",
          text: "hsl(var(--color-text))",
          "text-muted": "hsl(var(--color-text-muted))",
          heading: "hsl(var(--color-heading))",
          border: "hsl(var(--color-border))",
          success: "hsl(var(--color-success))",
          warning: "hsl(var(--color-warning))",
          error: "hsl(var(--color-error))",
          info: "hsl(var(--color-info))",
        },
      },

      // ─── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        // shadcn defaults
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Craftume tokens
        xs: "var(--radius-xs)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      // ─── Box shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      // ─── Transitions ─────────────────────────────────────────────────────────
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },

      // ─── Font families ────────────────────────────────────────────────────────
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },

      // ─── Layout ───────────────────────────────────────────────────────────────
      maxWidth: {
        container: "var(--container-width)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
      },
      height: {
        navbar: "var(--navbar-height)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
