export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Blob 1: Top-Left Primary (Violet) */}
      <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-primary opacity-20 blur-[130px] sm:h-[750px] sm:w-[750px]" />

      {/* Blob 2: Top-Right Secondary (Cyan) */}
      <div className="absolute -top-20 -right-40 h-[500px] w-[500px] rounded-full bg-secondary opacity-20 blur-[130px] sm:h-[700px] sm:w-[700px]" />

      {/* Blob 3: Bottom-Center Accent (Fuchsia) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-accent opacity-20 blur-[140px] sm:h-[800px] sm:w-[800px]" />
    </div>
  );
}
