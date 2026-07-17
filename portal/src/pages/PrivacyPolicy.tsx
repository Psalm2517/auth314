import { Brand } from "@/components/Brand";

const GITHUB_ISSUES_URL = "https://github.com/Psalm2517/auth314/issues";

export function PrivacyPolicy() {
  return (
    <div className="min-h-full">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1080px] items-center px-8 py-5">
          <a href="/">
            <Brand className="text-lg font-bold tracking-tight" />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[680px] px-8 py-16">
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Last updated 2026. This covers only this site (the Auth314
          verification portal), not any bot, integration, or third-party
          service that uses Auth314.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              What this page does
            </h2>
            <p>
              This page walks you through signing in with your Pi account to
              verify your Pi identity for whichever community or app sent
              you here. You arrive with a one-time verification link, sign
              in with Pi, and get sent back here to confirm the result.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              What this page stores in your browser
            </h2>
            <p>
              This site does not use cookies. While you're signing in, it
              temporarily stores two values in your browser's{" "}
              <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">
                sessionStorage
              </code>
              : a randomly generated value used to confirm the sign-in
              response actually came from Pi (not forged), and your
              verification session token. Both are deleted as soon as the
              sign-in completes, and{" "}
              <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">
                sessionStorage
              </code>{" "}
              is cleared automatically when you close the tab regardless.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              What happens when you sign in
            </h2>
            <p>
              Clicking "Sign in with Pi" sends you to Pi Network's own
              sign-in page, which is not operated by Auth314 and has its own
              privacy practices. When you're sent back here, your browser
              sends the resulting access token directly to Auth314's server
              over HTTPS, which uses it to confirm your identity with the Pi
              API. Your Pi user ID and username are stored on Auth314's
              server and are never sent to the community or app that
              requested verification -- only a yes/no verified signal is.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              Analytics and tracking
            </h2>
            <p>
              This page does not run any analytics, advertising, or
              third-party tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              Session expiry
            </h2>
            <p>
              Verification links expire 10 minutes after they're issued and
              can only be used once.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              Questions
            </h2>
            <p>
              Open an issue on{" "}
              <a
                href={GITHUB_ISSUES_URL}
                target="_blank"
                rel="noopener"
                className="underline hover:text-foreground"
              >
                GitHub
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <footer className="mx-auto max-w-[1080px] px-8 py-10 text-center text-xs text-muted-foreground">
        &copy; 2026 Auth314 &middot; a Yerette Group project
      </footer>
    </div>
  );
}
