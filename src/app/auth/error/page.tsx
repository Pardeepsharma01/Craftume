import Link from "next/link";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <p className="text-sm text-muted-foreground leading-relaxed">
      {params?.error
        ? `Error: ${params.error}`
        : "An unspecified error occurred. Please try again."}
    </p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl text-center">
          {/* Warning icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30">
            <svg
              className="h-7 w-7 text-destructive"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Something went wrong
            </h1>
          </div>

          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">Loading…</p>
            }
          >
            <ErrorContent searchParams={searchParams} />
          </Suspense>

          <Link
            href="/auth/login"
            className="
              w-full rounded-full px-6 py-2.5 text-sm font-semibold text-white
              bg-gradient-to-r from-primary to-secondary
              transition-all duration-300
              hover:scale-105 hover:shadow-lg hover:shadow-primary/25
              inline-block text-center
            "
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
