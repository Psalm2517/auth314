import { Brand } from "@/components/Brand";

const EMAIL = "hello@auth314.com";
const GITHUB_ISSUES_URL = "https://github.com/Psalm2517/auth314/issues";

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">
      {children}
    </code>
  );
}

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
          Last updated July 17, 2026. This covers all Auth314 services: auth314.com, app.auth314.com,
          dashboard.auth314.com, and the Auth314 Discord bot. It does not cover third-party bots,
          integrations, or communities that use Auth314 -- those are governed by their own policies.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">1. What Auth314 is</h2>
            <p>
              Auth314 is a developer tool that makes it straightforward to add "Sign in with Pi" support
              to bots, apps, and websites. It handles the Pi Sign-in OAuth flow on behalf of the
              developer and delivers a simple signal -- confirming that a user successfully signed in
              with their Pi account -- to the developer's webhook or callback. Auth314 does not operate
              the Pi Network and is not affiliated with Pi Network or the Pi Core Team.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">2. Information we collect</h2>

            <h3 className="mt-4 mb-1 font-semibold text-foreground">End users (people who sign in with Pi)</h3>
            <p className="mb-3">
              When you complete a Pi Sign-in through Auth314, the Pi Sign-in flow provides Auth314 with
              your Pi Network user ID and username. This is stored internally and is never shared with
              the operator, community, or any third party. Only a success signal (plus the platform user
              ID and guild ID you were signing in with) is delivered to the developer's webhook.
            </p>
            <p>
              Sign-in sessions expire 10 minutes after they are created and can only be used once.
              A log of the last 200 completions per API key is kept to support the operator's dashboard
              and for audit purposes.
            </p>

            <h3 className="mt-4 mb-1 font-semibold text-foreground">Dashboard users (developers and operators)</h3>
            <p>
              Currently, logging in to dashboard.auth314.com requires a Discord account. Auth314 receives
              your Discord user ID, username, and avatar from Discord at login time. A session
              cookie (<Code>auth314_dash</Code>) is stored in your browser to keep you signed in for up
              to 7 days, subject to your browser's cookie settings. Your API keys (names, creation
              timestamps, usage counters) are stored and associated with your Discord user ID.
            </p>

            <h3 className="mt-4 mb-1 font-semibold text-foreground">Auth314 Discord bot (hosted version)</h3>
            <p>
              When the Auth314-hosted Discord bot is used in a server, it records the Discord user ID
              and guild (server) ID associated with each sign-in request. This data is associated with
              Auth314's own API key and is visible in Auth314's internal dashboard only -- it is not
              accessible to individual server admins. The bot does not store message content, server
              member lists, or any data beyond what is necessary to initiate and log the sign-in.
              Operators running their own self-hosted bot using the Auth314 API control their own logs
              through their dashboard.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">3. Browser storage</h2>
            <p className="mb-3">
              The sign-in page (app.auth314.com) stores two values in <Code>sessionStorage</Code> while
              the Pi Sign-in flow is in progress: a CSRF state value and your session token. Both are
              deleted immediately after the flow completes. <Code>sessionStorage</Code> is also cleared
              automatically when you close the tab.
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
              <li>To complete the Pi Sign-in flow and deliver a success signal to the requesting developer.</li>
              <li>To maintain a log of sign-ins per API key for operator dashboards.</li>
              <li>To enforce per-key rate limits and monthly usage quotas.</li>
              <li>To authenticate dashboard users and associate API keys with their accounts.</li>
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
                <strong className="text-foreground">Pi Network</strong> -- to complete the Pi Sign-in
                flow (Pi Network's own privacy policy governs that interaction).
              </li>
              <li>
                <strong className="text-foreground">Discord</strong> -- to authenticate dashboard users
                (Discord's privacy policy governs that interaction).
              </li>
              <li>
                <strong className="text-foreground">Cloudflare</strong> -- Auth314 runs on Cloudflare's
                secure infrastructure. Data is processed and stored within Cloudflare's network.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">6. Data retention</h2>
            <p>
              Sign-in session records are short-lived (minutes to hours). Sign-in logs are capped at
              200 entries per API key on a rolling basis. Dashboard session cookies expire after 7 days.
              API key records and associated usage counters are retained until the key is revoked. Pi
              user ID and username records are retained for audit and support purposes but are never
              exposed externally.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">7. Your rights and data deletion</h2>
            <p className="mb-3">
              You may request deletion of any data associated with your Pi user ID or Discord account
              by emailing{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a>.
              Deletion of an operator account will also delete all associated API keys and sign-in logs.
              We will process deletion requests within a reasonable time.
            </p>
            <p>
              If you want to remove the Auth314-hosted Discord bot from your server, go to your Discord
              server's Settings, open Apps or Integrations, find Auth314, and remove it. Alternatively,
              a server administrator can kick the bot directly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">8. Security</h2>
            <p>
              API keys are stored as SHA-256 hashes -- the raw key is shown once at creation and cannot
              be recovered. Dashboard sessions use HTTP-only cookies not accessible to JavaScript.
              All traffic is served over HTTPS. Auth314 does not store Pi OAuth access tokens beyond
              the time needed to complete the sign-in.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">9. Changes to this policy</h2>
            <p>
              This policy may be updated as the service evolves. The "Last updated" date at the top
              reflects the most recent revision. Material changes will be announced on the GitHub
              repository.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">10. Contact</h2>
            <p>
              Questions or requests:{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a>
              {" "}or{" "}
              <a href={GITHUB_ISSUES_URL} target="_blank" rel="noopener" className="underline hover:text-foreground">
                GitHub Issues
              </a>.
            </p>
          </section>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1080px] px-8 py-10 text-center text-xs text-muted-foreground">
          &copy; 2026{" "}
          <a href="https://auth314.com" className="hover:text-foreground transition-colors">Auth314</a>
          {" "}&middot;{" "}
          <a href="mailto:hello@auth314.com" className="hover:text-foreground transition-colors">Yerette Group</a>
          {" "}&middot;{" "}
          <a href="/tos.html" className="underline hover:text-foreground">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
