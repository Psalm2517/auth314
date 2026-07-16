import type { Env, PiMeResponse } from "../types";

const PI_ME_URL = "https://api.minepi.com/v2/me";

export class PiApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "PiApiError";
  }
}

/**
 * Verify a user's access token against the Pi Platform API and return their
 * identity (uid + username). Throws PiApiError on any non-2xx response.
 *
 * Note: the /v2/me endpoint is called with the end user's access token. The
 * PI_API_KEY server credential is reserved for server-authenticated Pi API
 * calls and is intentionally not sent here.
 */
export async function fetchPiMe(
  _env: Env,
  accessToken: string,
): Promise<PiMeResponse> {
  const res = await fetch(PI_ME_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new PiApiError(
      `Pi /me returned ${res.status}: ${body.slice(0, 200)}`,
      res.status,
    );
  }

  const data = (await res.json()) as PiMeResponse;
  if (!data || !data.uid || !data.username) {
    throw new PiApiError("Pi /me response missing uid or username", 502);
  }
  return data;
}
