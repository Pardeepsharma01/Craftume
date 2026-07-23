/**
 * (marketing) route group layout
 * ================================
 * Shared layout wrapper for all marketing pages (/, /about, /pricing etc.)
 * Route groups don't add a URL segment — this is purely an organisational layer.
 * No shared UI here at the group level; the Navbar and Footer live inside each page
 * so individual pages can control scroll behaviour and full-bleed backgrounds cleanly.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
