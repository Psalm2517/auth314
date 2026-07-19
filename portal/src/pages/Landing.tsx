import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { SiDiscord, SiTelegram, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brand } from "@/components/Brand";

const PLATFORMS = [
  { icon: SiDiscord, name: "Discord", live: true },
  { icon: SiTelegram, name: "Telegram", live: false },
  { icon: Globe, name: "Websites", live: false },
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
    text: "Auth314 delivers the verified signal to your callback URL",
  },
];

const ROADMAP = [
  "Paid tiers with higher rate limits and quotas",
  "Telegram integration",
  "A drop-in \"Verify with Pi\" widget for websites -- no bot required",
];

const GITHUB_URL = "https://github.com/Psalm2517/auth314";

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </section>
  );
}

export function Landing() {
  return (
    <div
      className="min-h-full"
      style={{ background: "linear-gradient(180deg, #131415 0%, var(--background) 420px)" }}
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
              <SiGithub className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-320px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 68%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-120px] h-[360px] w-[560px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)" }}
        />
        <div className="relative mx-auto max-w-[680px] px-8 py-24 text-center">
          <div className="inline-flex mb-5" style={{ animation: "fade-up 0.5s ease-out 0ms both" }}>
            <Badge>In development · Free to use</Badge>
          </div>
          <h1
            className="mb-4 bg-clip-text text-[42px] font-bold leading-[1.2] tracking-tight text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, #ffffff 0%, #c7c7c9 100%)",
              animation: "fade-up 0.55s ease-out 80ms both",
            }}
          >
            Pi Sign-in, made simple.
          </h1>
          <p
            className="mx-auto mb-8 max-w-[500px] text-[17px] text-muted-foreground"
            style={{ animation: "fade-up 0.55s ease-out 160ms both" }}
          >
            Auth314 handles the Pi Sign-in OAuth flow so you don't have to.
            Get a verified signal delivered to your webhook -- no Pi Developer
            Portal app, no OAuth to build.
          </p>
          <div
            className="flex items-center justify-center gap-3"
            style={{ animation: "fade-up 0.55s ease-out 240ms both" }}
          >
            <Button size="pill" asChild>
              <a href="https://dashboard.auth314.com">Get started free</a>
            </Button>
            <a
              href="/discord-bot/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
            >
              <SiDiscord className="h-4 w-4" />
              Invite Bot
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
            >
              <SiGithub className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* How it works + payload */}
      <FadeSection className="border-b border-border">
        <div className="mx-auto max-w-[1080px] px-8 py-16">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                How it works
              </h2>
              <ol className="space-y-3.5">
                {STEPS.map((step, i) => (
                  <li
                    key={step.n}
                    className="flex items-baseline gap-3 text-sm"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
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
      </FadeSection>

      {/* Platforms */}
      <FadeSection className="border-b border-border">
        <div className="mx-auto max-w-[1080px] px-8 py-16 text-center">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Platforms
          </h2>
          <p className="mx-auto mb-10 max-w-[440px] text-sm text-muted-foreground">
            Starting with Discord, expanding from there.
          </p>
          <div className="mx-auto grid max-w-[480px] grid-cols-3 gap-4">
            {PLATFORMS.map(({ icon: Icon, name, live }, i) => (
              <div
                key={name}
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-6 transition-all duration-300 hover:border-muted-foreground/40 hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Icon className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-semibold">{name}</span>
                {live ? (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                    style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "#4ade80", boxShadow: "0 0 4px #4ade80" }}
                    />
                    Live
                  </span>
                ) : (
                  <Badge className="px-2.5 py-0.5 text-[10px]">Coming soon</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Pricing */}
      <FadeSection className="border-b border-border">
        <div className="mx-auto max-w-[680px] px-8 py-16">
          <h2 className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Pricing
          </h2>
          <p className="mx-auto mb-10 max-w-[520px] text-center text-sm text-muted-foreground">
            The free tier is permanent and will stay after launch. Paid plans will be introduced
            later with higher limits -- there will always be a free tier.
          </p>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold">Free</span>
                <span className="ml-2 text-sm text-muted-foreground">forever</span>
              </div>
              <Badge className="px-2.5 py-0.5 text-[10px]">Available now</Badge>
            </div>
            <ul className="space-y-2.5">
              {[
                "500 verifications / month",
                "20 requests / minute",
                "1 API key",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span
                    className="h-1 w-1 rounded-full flex-none"
                    style={{ background: "linear-gradient(135deg, #ffffff 0%, #c6c7cc 100%)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-border bg-card/50 p-6 opacity-60">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-bold">Pro</span>
              <Badge className="px-2.5 py-0.5 text-[10px]">Coming soon</Badge>
            </div>
            <ul className="space-y-2.5">
              {[
                "Higher monthly quota",
                "Higher rate limits",
                "Multiple API keys",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="h-1 w-1 rounded-full flex-none bg-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Need higher limits now?{" "}
            <a href="mailto:hello@auth314.com" className="underline hover:text-foreground">
              hello@auth314.com
            </a>
          </p>
        </div>
      </FadeSection>

      {/* Roadmap */}
      <FadeSection>
        <div className="mx-auto max-w-[680px] px-8 py-16">
          <h2 className="mb-10 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
            What's planned
          </h2>
          <ul className="space-y-4">
            {ROADMAP.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Badge className="mt-0.5 flex-none px-2.5 py-0.5 text-[10px]">Planned</Badge>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeSection>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1080px] px-8 py-10 text-center text-xs text-muted-foreground">
          <p>Powered by Auth314</p>
          <p className="mt-1">
            &copy; 2026{" "}
            <a href="https://auth314.com" className="hover:text-foreground transition-colors">
              Auth314
            </a>
            {" "}&middot;{" "}
            <a href="https://yerettegroup.com" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
              Yerette Group
            </a>
            {" "}&middot;{" "}
            <a href="/privacy.html" className="underline hover:text-foreground">Privacy</a>
            {" "}&middot;{" "}
            <a href="/tos.html" className="underline hover:text-foreground">Terms</a>
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
