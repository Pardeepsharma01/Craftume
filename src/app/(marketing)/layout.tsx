import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * (marketing) route group layout
 * ================================
 * Renders the fixed background aurora and wraps marketing page content.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <AuroraBackground />
      {children}
    </div>
  );
}
