import { AuroraBackground } from "@/components/ui/aurora-background";
import { DashboardNavbar } from "@/features/dashboard/components/DashboardNavbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Subdued Aurora background for optimal readability in authenticated app context */}
      <AuroraBackground subdued />

      {/* Main layout container elevated above background layers */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <DashboardNavbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>© 2026 Craftume. All rights reserved.</p>
            <p className="flex items-center gap-1">
              AI-Powered Resume Builder & ATS Checker
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
