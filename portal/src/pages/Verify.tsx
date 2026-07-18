import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Brand } from "@/components/Brand";
import { getConfig } from "@/lib/config";

type State = "checking" | "ready" | "redirecting" | "error";

export function Verify() {
  const session = useMemo(
    () => new URLSearchParams(window.location.search).get("session"),
    [],
  );

  const [state, setState] = useState<State>(session ? "checking" : "error");
  const [errorMessage, setErrorMessage] = useState(
    session
      ? ""
      : "No verification session found. Please use the link from your community bot.",
  );
  const checkedRef = useRef(false);

  function fail(message: string) {
    setErrorMessage(message);
    setState("error");
  }

  useEffect(() => {
    if (!session || checkedRef.current) return;
    checkedRef.current = true;

    const cfg = getConfig();
    let base: string;
    try {
      base = cfg.API_BASE_URL.replace(/\/$/, "");
      if (!base) throw new Error("empty base url");
    } catch {
      fail("Portal configuration is invalid. Please contact support.");
      return;
    }

    fetch(`${base}/verify/status?session=${encodeURIComponent(session)}`)
      .then(async (res) => {
        if (res.ok) {
          setState("ready");
          return;
        }
        const data = await res.json().catch(() => ({}));
        fail(
          (data as { error?: string }).error ??
            "This verification link is invalid or has expired.",
        );
      })
      .catch(() => {
        fail("Could not reach the verification service. Please try again.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function handleSignIn() {
    if (!session) return;
    setState("redirecting");

    const cfg = getConfig();
    const oauthState = crypto.randomUUID();

    try {
      sessionStorage.setItem("pi_oauth_state", oauthState);
      sessionStorage.setItem("pi_session", session);
    } catch {
      fail("This browser is blocking storage needed to complete sign-in.");
      return;
    }

    let url: URL;
    try {
      url = new URL(cfg.PI_AUTHORIZE_BASE_URL);
      url.searchParams.set("response_type", "token");
      url.searchParams.set("client_id", cfg.PI_OAUTH_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        cfg.PORTAL_BASE_URL.replace(/\/$/, "") + "/callback.html",
      );
      url.searchParams.set("scope", "username");
      url.searchParams.set("state", oauthState);
    } catch {
      fail("Portal configuration is invalid. Please contact support.");
      return;
    }

    window.location.assign(url.toString());
  }

  return (
    <div className="flex min-h-full items-center justify-center p-5">
      <Card className="w-full max-w-[400px] p-8 text-center">
        <Brand className="mb-1 text-[22px] font-bold tracking-tight" />
        <p className="mb-6 text-sm text-muted-foreground">
          Pi Network verification
        </p>

        {state === "checking" && (
          <div>
            <Spinner />
            <h1 className="mb-2 mt-3 text-lg font-semibold">
              Checking your link…
            </h1>
            <p className="text-sm text-muted-foreground">
              Confirming this verification link is still valid.
            </p>
          </div>
        )}

        {state === "ready" && (
          <div>
            <h1 className="mb-2 mt-3 text-lg font-semibold">
              Verify your Pi account
            </h1>
            <p className="mb-2 text-sm text-muted-foreground">
              Confirm your Pi identity to complete verification for your
              community.
            </p>
            <Button className="mt-4 w-full" onClick={handleSignIn}>
              Continue with Pi Sign-in
            </Button>
          </div>
        )}

        {state === "redirecting" && (
          <div>
            <Spinner />
            <h1 className="mb-2 mt-3 text-lg font-semibold">Redirecting…</h1>
            <p className="text-sm text-muted-foreground">
              Taking you to Pi Sign-in.
            </p>
          </div>
        )}

        {state === "error" && (
          <div>
            <div className="mb-1 text-4xl text-destructive">✕</div>
            <h1 className="mb-2 mt-3 text-lg font-semibold">
              Something went wrong
            </h1>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Powered by Auth314
        </p>
      </Card>
    </div>
  );
}
