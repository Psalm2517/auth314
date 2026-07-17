export interface Env {
  // KV binding
  AUTH314_KV: KVNamespace;

  // Secrets / config (see .env.example)
  PI_OAUTH_CLIENT_ID: string;
  PI_API_KEY: string;
  PI_AUTHORIZE_BASE_URL: string;
  PORTAL_BASE_URL: string;
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
