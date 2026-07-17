import { Brand } from "@/components/Brand";

const EMAIL = "hello@auth314.com";

export function TermsOfService() {
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
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Last updated July 17, 2026. By using any Auth314 service -- including auth314.com,
          app.auth314.com, dashboard.auth314.com, the Auth314 API, or the Auth314 Discord bot --
          you agree to these terms.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">1. Service description</h2>
            <p>
              Auth314 is a developer tool that makes it straightforward to add "Sign in with Pi" support
              to bots, apps, and websites. It handles the Pi Sign-in OAuth flow and delivers a simple
              success signal to the developer's webhook or callback URL. Auth314 is operated by
              Yerette Group and is not affiliated with Pi Network or the Pi Core Team.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">2. Eligibility</h2>
            <p>
              Because Pi Network requires users to be 18 or older, you must be at least 18 years old
              to use Auth314 services. By using Auth314 you represent that you have the legal authority
              to accept these terms, and if acting on behalf of an organization, that you have authority
              to bind that organization.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">3. Accounts and API keys</h2>
            <p className="mb-3">
              Currently, accessing the dashboard requires a Discord account. You are responsible for
              keeping your API keys confidential. Do not share keys publicly, commit them to public
              repositories, or allow unauthorized parties to use them.
            </p>
            <p>
              API keys are shown once at creation. Auth314 cannot recover them. If a key is compromised,
              revoke it immediately from the dashboard and create a new one. You are responsible for all
              activity conducted with your keys.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">4. Acceptable use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use Auth314 to initiate Pi Sign-in flows without the end user's knowledge or consent.</li>
              <li>Misrepresent the purpose of the sign-in to end users.</li>
              <li>Attempt to circumvent rate limits, quotas, or authentication mechanisms.</li>
              <li>Use Auth314 for spam, harassment, fraud, or any illegal purpose.</li>
              <li>Resell or sublicense Auth314 services without written permission.</li>
              <li>Reverse-engineer, scrape, or attempt to access internal APIs not documented publicly.</li>
              <li>Use Auth314 in a way that violates Pi Network's own terms of service.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">5. Free tier and limits</h2>
            <p>
              Auth314 currently offers a free tier with 1,000 verifications per month, 20 requests per
              minute, and 1 API key. The free tier is permanent and will remain available after paid
              plans are introduced. All tier limits and features are subject to change; Auth314 will
              provide reasonable notice of material changes. Exceeding limits returns an error rather
              than incurring charges. For higher limits in the meantime, contact{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">6. Discord bot</h2>
            <p>
              The Auth314 Discord bot is provided as a hosted integration option. By adding it to a
              server you confirm you have the authority to do so and agree to use it in compliance with
              Discord's Terms of Service and Community Guidelines. Auth314 reserves the right to remove
              the bot from servers that violate these terms. To remove the bot yourself, see your
              server's Settings under Apps or Integrations.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">7. Availability and changes</h2>
            <p>
              Auth314 is provided as-is during its current development phase. We aim for high uptime but
              make no guarantees. The service, its features, and its pricing may change at any time. We
              will provide reasonable notice of material changes where possible. Auth314 reserves the
              right to suspend or terminate access for violations of these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">8. Operator responsibilities</h2>
            <p>
              Operators who integrate Auth314 into their bots, apps, or websites are responsible for:
              informing their end users that the Pi Sign-in flow is facilitated by Auth314; complying
              with applicable privacy laws in their jurisdiction; not storing or processing the success
              signal in ways that harm end users; and maintaining their own privacy policy covering
              their use of the data delivered to their webhook.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">9. Intellectual property</h2>
            <p>
              The Auth314 core service is open-source. See the{" "}
              <a
                href="https://github.com/Psalm2517/auth314"
                target="_blank"
                rel="noopener"
                className="underline hover:text-foreground"
              >
                GitHub repository
              </a>{" "}
              for the applicable license. The Auth314 name, branding, and hosted infrastructure are
              owned by Yerette Group. The open-source license does not grant rights to operate a
              competing hosted service under the Auth314 name.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">10. Data deletion</h2>
            <p>
              To request deletion of your data, email{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a>{" "}
              with your Discord username or Pi username. We will delete associated records within a
              reasonable time. Deleting an operator account also deletes all associated API keys and
              sign-in logs.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">11. Disclaimer of warranties</h2>
            <p>
              Auth314 is provided "as is" without warranty of any kind, express or implied. Yerette Group
              does not warrant that the service will be uninterrupted, error-free, or that Pi Sign-in
              flows will succeed at all times.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">12. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Yerette Group shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of Auth314, including
              but not limited to loss of data, revenue, or access.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">13. Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">{EMAIL}</a>.
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
          <a href="/privacy.html" className="underline hover:text-foreground">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
