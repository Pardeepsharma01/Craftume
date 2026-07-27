import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl text-center">
          {/* Check icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Thank you for signing up!
            </h1>
            <p className="text-sm text-muted-foreground">
              Check your email to confirm your account
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </p>

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
