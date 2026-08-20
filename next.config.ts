import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // react-pdf tries to import 'canvas' as a server-side rendering fallback.
  // Since we use PDFDownloadLink only on the client (dynamic import, ssr:false),
  // we alias 'canvas' to false so it doesn't cause build/server errors.
  // Next.js 16 uses Turbopack by default — the turbopack config handles this.
  turbopack: {
    resolveAlias: {
      canvas: { browser: "./src/lib/empty-module.ts" },
    },
  },
};

export default nextConfig;
