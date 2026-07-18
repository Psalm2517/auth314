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
          Last updated 2026. This covers auth314.com (this site) and
          app.auth314.com (where Pi sign-in happens), not any bot,
          integration, or third-party service that uses Auth314.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              This site (auth314.com)
            </h2>
            <p>
              This is a static informational site. It does not use cookies,
              does not store anything in your browser, and does not run any
              analytics, advertising, or third-party tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              The verification flow (app.auth314.com)
            </h2>
            <p>
              Verification links (from a bot or app that integrates with
              Auth314) send you to app.auth314.com to sign in with your Pi
              account. That page does not use cookies either, but while
              you're signing in it temporarily stores two values in your
              browser's{" "}
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
              Clicking "Continue with Pi Sign-in" sends you to Pi Network's own
              sign-in page, which is not operated by Auth314 and has its own
              privacy practices. When you're sent back to app.auth314.com,
              your browser sends the resulting access token directly to
              Auth314's server over HTTPS, which uses it to confirm your
              identity with the Pi API. Your Pi user ID and username are
              stored on Auth314's server and are never sent to the community
              or app that requested verification -- only a yes/no verified
              signal is.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">
              Why your Pi user ID is stored at all
            </h2>
            <p>
              Auth314 keeps a record of your Pi user ID and username on its
              server so it has an internal audit trail of who verified and
              when, so support questions about a specific verification can
              be answered without asking you to sign in again, and so future
              features (like recognizing you've already verified elsewhere
              on the same platform, to skip asking you to sign in twice)
              have something to check against. It is never sent to the
              community or app that requested your verification -- see
              "What happens when you sign in" above.
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
        &copy; 2026 Auth314 &middot;{" "}
        <a href="https://yerettegroup.com" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">Yerette Group</a>
      </footer>
    </div>
  );
}
