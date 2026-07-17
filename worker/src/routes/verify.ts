import type { Env } from "../types";
import { error, json } from "../lib/http";
import { createSession, isSessionExpired } from "../lib/session";
import { getSession } from "../lib/kv";

interface VerifyInitBody {
  platform?: string;
  platform_user_id?: string;
  guild_id?: string;
  callback_url?: string;
}

/**
 * POST /verify/init
 * Called by platform integrations to start a verification session.
 */
export async function handleVerifyInit(
  req: Request,
  env: Env,
): Promise<Response> {
  let body: VerifyInitBody;
  try {
    body = (await req.json()) as VerifyInitBody;
  } catch {
    return error("Invalid JSON body", 400);
  }

  const { platform, platform_user_id, guild_id, callback_url } = body;

  if (!platform) {
    return error("platform is required", 400);
  }
  if (!platform_user_id) {
    return error("platform_user_id is required", 400);
  }
  if (!callback_url) {
    return error("callback_url is required", 400);
  }
  try {
    const parsed = new URL(callback_url);
    if (parsed.protocol !== "https:") {
      return error("callback_url must be https", 400);
    }
  } catch {
    return error("callback_url must be a valid URL", 400);
  }

  const { token, record } = await createSession(env, {
    platform,
    platform_user_id,
    guild_id: guild_id ?? "",
    callback_url,
  });

  const verifyUrl = `${env.PORTAL_BASE_URL}/?session=${encodeURIComponent(token)}`;

  return json({
    verify_url: verifyUrl,
    session: token,
    expires_at: record.expires_at,
  });
}

/**
 * GET /verify/status?session=<token>
 * Read-only check the portal calls before starting the Pi sign-in flow, so
 * an invalid/expired/used session is rejected up front instead of only
 * after the user completes the entire OAuth round-trip. Does not consume
 * the session -- only /auth/callback marks it used.
 */
export async function handleVerifyStatus(
  req: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(req.url);
  const session = url.searchParams.get("session");
  if (!session) return error("session is required", 400);

  const record = await getSession(env, session);
  if (!record) return error("Session not found or expired", 404);
  if (record.used) return error("Session already used", 409);
  if (isSessionExpired(record)) return error("Session expired", 410);

  return json({ valid: true });
}
