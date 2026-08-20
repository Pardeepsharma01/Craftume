import { Eye, Sparkles, FileText } from "lucide-react";

export function PreviewPlaceholder() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center text-center max-w-sm p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 shadow-inner">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-background shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            Live Preview Placeholder
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your real-time formatted resume preview and PDF export rendering will be integrated in Phase 3c.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
          <Eye className="h-3 w-3 text-secondary" />
          <span>Interactive Preview Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
