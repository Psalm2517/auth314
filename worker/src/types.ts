export interface Env {
  // KV binding
  AUTH314_KV: KVNamespace;

  // Secrets / config (see .env.example)
  PI_OAUTH_CLIENT_ID: string;
  PI_API_KEY: string;
  PI_AUTHORIZE_BASE_URL: string;
  PORTAL_BASE_URL: string;

  // Shared secret with first-party Auth314 integrations (e.g. auth314-bot).
  // Authenticates trusted callers of /api/verify/init and is echoed on
  // outgoing /auth/callback webhook deliveries so those integrations can
  // verify a callback genuinely came from this Worker.
  AUTH314_API_SECRET: string;
}

export type Platform = string;

export interface SessionRecord {
  platform: Platform;
  platform_user_id: string;
  guild_id: string;
  callback_url: string;
  expires_at: string; // ISO 8601
  used: boolean;
  key_id: string;
  owner_id: string;
}

export interface IdentityRecord {
  pi_uid: string;
  pi_username: string;
  platform: Platform;
  platform_user_id: string;
  guild_id: string;
  callback_url: string;
  verified_at: string; // ISO 8601
}

// Shape returned by GET https://api.minepi.com/v2/me
export interface PiMeResponse {
  uid: string;
  username: string;
}
