import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/Spinner";
import { Brand } from "@/components/Brand";
import { getConfig } from "@/lib/config";

type State = "processing" | "success" | "error";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "You declined Pi Sign-in. Please try again.",
  expired: "Sign-in request timed out. Please try again.",
  cancelled: "Sign-in was cancelled. Please try again.",
  server_error: "Pi Sign-in encountered an error. Please try again.",
};

export function Callback() {
  const [state, setState] = useState<State>("processing");
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again.",
  );
  const ranRef = useRef(false);

  useEffect(() => {
    // Guard against double-invocation (e.g. React StrictMode) running this
    // one-time-use flow twice.
    if (ranRef.current) return;
    ranRef.current = true;

    function fail(message: string) {
      setErrorMessage(message);
      setState("error");
    }

    const params = new URLSearchParams(window.location.hash.slice(1));

    // Verify CSRF state before trusting anything else in the fragment.
    let expectedState: string | null = null;
    try {
      expectedState = sessionStorage.getItem("pi_oauth_state");
      sessionStorage.removeItem("pi_oauth_state");
    } catch {
      // sessionStorage unavailable; expectedState stays null and the check
      // below fails closed.
    }

    const returnedState = params.get("state");

    // Clear the token/fragment from the URL immediately so it isn't left
    // sitting in browser history.
    history.replaceState(null, "", window.location.pathname);

    if (!expectedState || returnedState !== expectedState) {
      fail("Sign-in could not be verified (state mismatch). Please try again.");
      return;
    }

    const oauthError = params.get("error");
    if (oauthError) {
      fail(ERROR_MESSAGES[oauthError] ?? "Pi Sign-in failed. Please try again.");
      return;
    }

    const accessToken = params.get("access_token");
    if (!accessToken) {
      fail("No access token returned from Pi. Please restart verification.");
      return;
    }

    let session: string | null = null;
    try {
      session = sessionStorage.getItem("pi_session");
      sessionStorage.removeItem("pi_session");
    } catch {
      // handled by the null check below
    }

    if (!session) {
      fail("Your verification session was lost. Please restart from your community bot.");
      return;
    }

    const cfg = getConfig();

    fetch(cfg.API_BASE_URL.replace(/\/$/, "") + "/auth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: accessToken, session }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, data };
      })
      .then((result) => {
        if (result.ok) {
          setState("success");
        } else {
          fail(
            (result.data as { error?: string })?.error ??
              "Verification could not be completed.",
          );
        }
      })
      .catch(() => {
        fail("Could not reach the verification service. Please try again.");
      });
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center p-5">
      <Card className="w-full max-w-[400px] p-8 text-center">
        <Brand className="mb-1 text-[22px] font-bold tracking-tight" />
        <p className="mb-6 text-sm text-muted-foreground">
          Pi Network verification
        </p>

        {state === "processing" && (
          <div>
            <Spinner />
            <h1 className="mb-2 mt-3 text-lg font-semibold">Verifying…</h1>
            <p className="text-sm text-muted-foreground">
              Confirming your Pi identity.
            </p>
          </div>
        )}

        {state === "success" && (
          <div>
            <div className="mb-1 text-4xl text-success">✓</div>
            <h1 className="mb-2 mt-3 text-lg font-semibold">Verified!</h1>
            <p className="text-sm text-muted-foreground">
              Verification complete. You can close this page.
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
