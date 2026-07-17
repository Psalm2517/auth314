import type { Env } from "../types";

export interface VerificationEntry {
  timestamp: string;
  platform: string;
  guild_id: string;
  platform_user_id: string;
  key_id: string;
  key_name: string;
}

const MAX_ENTRIES = 200;

export async function logVerification(env: Env, owner_discord_user_id: string, entry: VerificationEntry): Promise<void> {
  const kvKey = `verlog:user:${owner_discord_user_id}`;
  const raw = await env.AUTH314_KV.get(kvKey);
  const entries: VerificationEntry[] = raw ? JSON.parse(raw) : [];
  entries.unshift(entry);
  if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
  await env.AUTH314_KV.put(kvKey, JSON.stringify(entries));
}
