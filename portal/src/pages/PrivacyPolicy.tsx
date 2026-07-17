import { Brand } from "@/components/Brand";

const EMAIL = "hello@auth314.com";
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
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Last updated July 2026. This covers all Auth314 services: auth314.com, app.auth314.com,
          dashboard.auth314.com, and the Auth314 Discord bot. It does not cover third-party bots,
          integrations, or communities that use Auth314 — those are governed by their own policies.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">1. What Auth314 is</h2>
            <p>
              Auth314 is an identity verification service for the Pi Network. It lets bots, apps, and
              websites verify that a user holds a genuine Pi account by redirecting them through Pi
              Network's own sign-in flow and delivering a verified signal to the operator's webhook.
              Auth314 does not operate the Pi Network and is not affiliated with Pi Network or the
              Pi Core Team.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">2. Information we collect</h2>

            <h3 className="mt-4 mb-1 font-semibold text-foreground">End users (people who verify)</h3>
            <p className="mb-3">
              When you complete a verification, Auth314 receives your Pi Network user ID and username
              from the Pi API. This is stored internally and is never shared with the operator, community,
              or any third party. Only a yes/no verified signal (plus the platform user ID and guild ID
              you were verified with) is delivered to the operator's webhook.
            </p>
            <p>
              Verification sessions expire 10 minutes after they are created and can only be used once.
              A log of the last 200 verifications associated with each API key is kept to support the
              operator's dashboard and for audit purposes.
            </p>

            <h3 className="mt-4 mb-1 font-semibold text-foreground">Dashboard users (developers and operators)</h3>
            <p>
              Logging in to dashboard.auth314.com requires a Discord account. Auth314 receives your
              Discord user ID, username, and avatar from the Discord API at login time. A session
              cookie (<code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">auth314_dash</code>)
              is stored in your browser to keep you signed in for 7 days. Your API keys (names, creation
              timestamps, usage counters) are stored and associated with your Discord user ID.
            </p>

            <h3 className="mt-4 mb-1 font-semibold text-foreground">Discord bot</h3>
            <p>
              When the Auth314 Discord bot is used in a server, it records the Discord user ID and guild
              (server) ID associated with each verification request. These are included in the verification
              log visible in the operator's dashboard. The bot does not store message content, server
              member lists, or any data beyond what is necessary to initiate and log the verification.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">3. Browser storage</h2>
            <p className="mb-3">
              The verification page (app.auth314.com) stores two values in{" "}
              <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">sessionStorage</code>{" "}
              while the Pi sign-in flow is in progress: a CSRF state value and your verification session
              token. Both are deleted immediately after the flow completes.{" "}
              <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">sessionStorage</code>{" "}
              is also cleared automatically when you close the tab.
            </p>
            <p>
              The dashboard (dashboard.auth314.com) sets an HTTP-only, Secure, SameSite=Lax session
              cookie upon login. No other cookies or local storage are used across any Auth314 service.
              No analytics, advertising, or third-party tracking scripts are loaded on any Auth314 page.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">4. How information is used</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To verify your Pi identity and deliver a verified signal to the requesting operator.</li>
              <li>To maintain an audit log of verifications per API key for operator dashboards.</li>
              <li>To enforce per-key rate limits and monthly usage quotas.</li>
              <li>To authenticate dashboard users and associate API keys with their Discord accounts.</li>
              <li>To respond to support requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">5. Data sharing</h2>
            <p className="mb-3">
              Auth314 does not sell, rent, or share personal data with third parties for commercial
              purposes. The only external services contacted are:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-foreground">Pi Network</strong> — to confirm your identity
                during sign-in (their privacy policy governs that interaction).
              </li>
              <li>
                <strong className="text-foreground">Discord</strong> — to authenticate dashboard users
                (Discord's privacy policy governs that interaction).
              </li>
              <li>
                <strong className="text-foreground">Cloudflare</strong> — Auth314 runs on Cloudflare
                Workers and uses Cloudflare KV for storage. Data is processed and stored within
                Cloudflare's infrastructure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">6. Data retention</h2>
            <p>
              Verification session records are short-lived (minutes to hours). Verification logs are
              capped at 200 entries per API key on a rolling basis. Dashboard session cookies expire
              after 7 days. API key records and associated usage counters are retained until the key is
              revoked. Pi user ID and username records are retained indefinitely for audit and support
              purposes, but are never exposed externally.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">7. Your rights</h2>
            <p>
              You may request deletion of any data associated with your Pi user ID or Discord account
              by emailing{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a>.
              Deletion of an operator account will also delete all associated API keys and verification
              logs.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">8. Security</h2>
            <p>
              API keys are stored as SHA-256 hashes — the raw key is shown once at creation and cannot
              be recovered. Dashboard sessions use HTTP-only cookies not accessible to JavaScript.
              All traffic is served over HTTPS. Auth314 does not store Pi OAuth tokens beyond the
              time needed to confirm identity.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">9. Changes to this policy</h2>
            <p>
              This policy may be updated as the service evolves. The "Last updated" date at the top of
              this page reflects the most recent revision. Material changes will be announced on the
              GitHub repository.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">10. Contact</h2>
            <p>
              Questions or requests:{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a> or{" "}
              <a href={GITHUB_ISSUES_URL} target="_blank" rel="noopener" className="underline hover:text-foreground">
                GitHub Issues
              </a>.
            </p>
          </section>
        </div>
      </div>

      <footer className="border-t border-border mx-auto max-w-[1080px] px-8 py-10 text-center text-xs text-muted-foreground">
        &copy; 2026 Auth314 &middot; Yerette Group &middot;{" "}
        <a href="/tos.html" className="underline hover:text-foreground">Terms of Service</a>
      </footer>
    </div>
  );
}
