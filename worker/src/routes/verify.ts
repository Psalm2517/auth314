import type { Env, Platform } from "../types";
import { error, json } from "../lib/http";
import { createSession } from "../lib/session";

const VALID_PLATFORMS: Platform[] = ["discord", "telegram"];

interface VerifyInitBody {
  platform?: string;
  platform_user_id?: string;
  guild_id?: string;
  callback_url?: string;
}

/**
 * POST /api/verify/init
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

  if (!platform || !VALID_PLATFORMS.includes(platform as Platform)) {
    return error("platform must be one of: discord, telegram", 400);
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
    platform: platform as Platform,
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
