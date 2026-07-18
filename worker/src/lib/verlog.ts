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

export async function logVerification(env: Env, owner_id: string, entry: VerificationEntry): Promise<void> {
  const kvKey = `verlog:user:${owner_id}`;
  const raw = await env.AUTH314_KV.get(kvKey);
  const entries: VerificationEntry[] = raw ? JSON.parse(raw) : [];
  entries.unshift(entry);
  if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
  await env.AUTH314_KV.put(kvKey, JSON.stringify(entries));
}

/**
 * Platform-wide lifetime counters, across all operators. Unlike verlog
 * (capped at 200 entries per operator, for their own dashboard log), these
 * never roll off -- read by the admin panel for total verification stats.
 */
export async function incrementGlobalStats(env: Env, platform: string): Promise<void> {
  const totalKey = "global:total_verifications";
  const platformKey = `global:platform:${platform}`;

  const [totalRaw, platformRaw] = await Promise.all([
    env.AUTH314_KV.get(totalKey),
    env.AUTH314_KV.get(platformKey),
  ]);

  const total = totalRaw ? parseInt(totalRaw, 10) : 0;
  const platformCount = platformRaw ? parseInt(platformRaw, 10) : 0;

  await Promise.all([
    env.AUTH314_KV.put(totalKey, String(total + 1)),
    env.AUTH314_KV.put(platformKey, String(platformCount + 1)),
  ]);
}
