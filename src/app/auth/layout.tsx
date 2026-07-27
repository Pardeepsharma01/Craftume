import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * Auth route group layout
 * =======================
 * Auth pages (/auth/login, /auth/sign-up, etc.) are NOT inside (marketing),
 * so they need their own layout to get the AuroraBackground.
 * Content is at z-10 so it floats above the fixed aurora blobs (z-[1]).
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen text-foreground antialiased">
      <AuroraBackground />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
