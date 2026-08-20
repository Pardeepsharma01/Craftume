interface AuroraBackgroundProps {
  subdued?: boolean;
}

export function AuroraBackground({ subdued = false }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      /*
       * z-[1]: must be a positive value to appear above the <body> background.
       * Negative z-index (e.g. -z-10) sinks the element BELOW the body's
       * bg-background canvas, making the entire aurora invisible.
       *
       * pointer-events-none: clicks pass through to content above.
       * overflow-hidden: cleanly clips blobs that extend past viewport edges.
       */
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none"
    >
      {/* Blob 1: Top-Left — Primary (Violet) */}
      <div
        className={`animate-blob absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-primary blur-[130px] sm:h-[750px] sm:w-[750px] ${
          subdued ? "opacity-15" : "opacity-30"
        }`}
      />

      {/* Blob 2: Top-Right — Secondary (Cyan) */}
      <div
        className={`animate-blob animation-delay-2000 absolute -top-20 -right-40 h-[500px] w-[500px] rounded-full bg-secondary blur-[130px] sm:h-[700px] sm:w-[700px] ${
          subdued ? "opacity-15" : "opacity-30"
        }`}
      />

      {/* Blob 3: Bottom-Center — Accent (Fuchsia) */}
      <div
        className={`animate-blob animation-delay-4000 absolute top-1/2 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-accent blur-[140px] sm:h-[800px] sm:w-[800px] ${
          subdued ? "opacity-10" : "opacity-30"
        }`}
      />
    </div>
  );
}