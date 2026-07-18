import { Github, Globe, Sparkles } from "lucide-react";
import { SiDiscord, SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brand } from "@/components/Brand";

const PLATFORMS = [
  { icon: SiDiscord, name: "Discord" },
  { icon: SiTelegram, name: "Telegram" },
  { icon: Globe, name: "Websites" },
  { icon: Sparkles, name: "More" },
];

const STEPS = [
  {
    n: 1,
    text: (
      <>
        Your app calls{" "}
        <code className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[13px]">
          /verify/init
        </code>
      </>
    ),
  },
  { n: 2, text: "User clicks the link and signs in with Pi" },
  {
    n: 3,
    text: "Auth314 delivers the verified identity to your callback URL",
  },
];

const GITHUB_URL = "https://github.com/Psalm2517/auth314";

export function Landing() {
  return (
    <div
      className="min-h-full"
      style={{
        background:
          "linear-gradient(180deg, #131415 0%, var(--background) 420px)",
      }}
    >
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-8 py-5">
          <Brand className="text-lg font-bold tracking-tight" />
          <div className="flex items-center gap-3">
            <a
              href="https://dashboard.auth314.com"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </a>
            <a
              href="https://docs.auth314.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
            >
              Docs
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(232,232,233,0.14) 0%, rgba(232,232,233,0.05) 40%, rgba(232,232,233,0) 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-120px] h-[360px] w-[560px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[680px] px-8 py-24 text-center">
          <Badge className="mb-5">In development, not yet publicly available</Badge>
          <h1
            className="mb-4 bg-clip-text text-[40px] font-bold leading-[1.25] tracking-tight text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #c7c7c9 100%)",
            }}
          >
            Pi Sign-in, made simple.
          </h1>
          <p className="mx-auto mb-8 max-w-[500px] text-[17px] text-muted-foreground">
            Auth314 handles the Pi Sign-in OAuth flow so you don't have to.
            Get a verified signal delivered to your webhook, no Pi Developer
            Portal app and no OAuth to build.
          </p>
          <Button size="pill" href={GITHUB_URL} target="_blank" rel="noopener">
            View on GitHub
          </Button>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-8 py-16">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                How it works
              </h2>
              <ol className="space-y-3.5">
                {STEPS.map((step) => (
                  <li key={step.n} className="flex items-baseline gap-3 text-sm">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border bg-background text-[11px] font-bold text-muted-foreground">
                      {step.n}
                    </span>
                    <span className="pt-px">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Webhook payload
              </h2>
              <pre className="overflow-x-auto rounded-md border border-border bg-background p-4 font-mono text-[12.5px] leading-[1.6]">
                <code>
                  <span className="text-muted-foreground">{"{"}</span>
                  {"\n  "}
                  <span className="text-[#8ab4f8]">"platform_user_id"</span>
                  {": "}
                  <span className="text-[#a8cc8c]">"..."</span>
                  {","}
                  {"\n  "}
                  <span className="text-[#8ab4f8]">"guild_id"</span>
                  {": "}
                  <span className="text-[#a8cc8c]">"..."</span>
                  {","}
                  {"\n  "}
                  <span className="text-[#8ab4f8]">"verified"</span>
                  {": "}
                  <span className="text-[#d7ba7d]">true</span>
                  {"\n"}
                  <span className="text-muted-foreground">{"}"}</span>
                </code>
              </pre>
              <p className="mt-3 text-xs text-muted-foreground">
                Pi identity (uid, username) stays internal to Auth314 and is
                never included in the webhook payload.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1080px] px-8 py-16 text-center">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Platforms
          </h2>
          <p className="mx-auto mb-10 max-w-[440px] text-sm text-muted-foreground">
            Starting with Discord, expanding from there.
          </p>
          <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-4 sm:grid-cols-4">
            {PLATFORMS.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-6"
              >
                <Icon className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-semibold">{name}</span>
                <Badge className="px-2.5 py-0.5 text-[10px]">Coming soon</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-[1080px] px-8 py-10 text-center text-xs text-muted-foreground">
        <p>Powered by Auth314</p>
        <p className="mt-1">
          &copy; 2026 Auth314 &middot;{" "}
          <a href="https://yerettegroup.com" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">Yerette Group</a>
          {" "}&middot;{" "}
          <a href="/privacy.html" className="underline hover:text-foreground">
            Privacy
          </a>
        </p>
      </footer>
    </div>
  );
}
