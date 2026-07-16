import type { Env, IdentityRecord } from "../types";
import { error, json } from "../lib/http";
import { getSession, markSessionUsed, putIdentity } from "../lib/kv";
import { isSessionExpired } from "../lib/session";
import { fetchPiMe, PiApiError } from "../lib/pi";

interface AuthCallbackBody {
  access_token?: string;
  session?: string;
}

/**
 * POST /api/auth/callback
 * Called by the portal after extracting the access token from the OAuth
 * redirect fragment.
 */
export async function handleAuthCallback(
  req: Request,
  env: Env,
): Promise<Response> {
  let body: AuthCallbackBody;
  try {
    body = (await req.json()) as AuthCallbackBody;
  } catch {
    return error("Invalid JSON body", 400);
  }

  const { access_token, session } = body;
  if (!access_token) return error("access_token is required", 400);
  if (!session) return error("session is required", 400);

  // 1. Look up session, reject if missing, expired, or already used.
  const record = await getSession(env, session);
  if (!record) return error("Session not found or expired", 404);
  if (record.used) return error("Session already used", 409);
  if (isSessionExpired(record)) return error("Session expired", 410);

  // 2. Mark session as used immediately (one-time use guard).
  await markSessionUsed(env, session, record);

  // 3. Verify the access token against the Pi API.
  let me;
  try {
    me = await fetchPiMe(env, access_token);
  } catch (err) {
    const status = err instanceof PiApiError ? 401 : 502;
    return error(
      `Pi verification failed: ${(err as Error).message}`,
      status,
    );
  }

  // 4. Store identity mapping in KV.
  const identity: IdentityRecord = {
    pi_uid: me.uid,
    pi_username: me.username,
    platform: record.platform,
    platform_user_id: record.platform_user_id,
    verified_at: new Date().toISOString(),
  };
  await putIdentity(env, identity);

  // 5. POST the result to the integration's callback_url.
  const callbackPayload = {
    platform: record.platform,
    platform_user_id: record.platform_user_id,
    guild_id: record.guild_id,
    pi_uid: me.uid,
    pi_username: me.username,
  };

  try {
    const cbRes = await fetch(record.callback_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(callbackPayload),
    });
    if (!cbRes.ok) {
      return error(
        `Callback delivery failed with status ${cbRes.status}`,
        502,
      );
    }
  } catch (err) {
    return error(
      `Callback delivery failed: ${(err as Error).message}`,
      502,
    );
  }

  // 6. Return success to the portal.
  return json({
    status: "verified",
    pi_username: me.username,
    platform: record.platform,
  });
}
