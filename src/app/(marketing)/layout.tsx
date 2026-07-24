import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * (marketing) route group layout
 * ================================
 * AuroraBackground is fixed at z-[1] (above body background).
 * Content lives inside <main> at z-10 (above aurora blobs).
 *
 * IMPORTANT: The layout div must NOT have an explicit z-index — setting z-0
 * creates a stacking context that can interfere with the fixed aurora layer.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <AuroraBackground />
      {/* z-10 ensures all page content sits above the aurora blobs (z-[1]) */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
