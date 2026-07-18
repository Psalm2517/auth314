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

async function incrementCounter(env: Env, key: string): Promise<void> {
  const raw = await env.AUTH314_KV.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  await env.AUTH314_KV.put(key, String(count + 1));
}

/**
 * Platform-wide lifetime counters, across all operators. Unlike verlog
 * (capped at 200 entries per operator, for their own dashboard log), these
 * never roll off -- read by the admin panel for total verification stats.
 */
export async function incrementGlobalStats(env: Env, platform: string): Promise<void> {
  await Promise.all([
    incrementCounter(env, "global:total_verifications"),
    incrementCounter(env, `global:platform:${platform}`),
  ]);
}

/**
 * A user reached the Pi OAuth callback but Pi verification itself failed
 * (bad/expired token, Pi API error) -- tracked separately from successes
 * for a success-rate metric on the admin analytics view.
 */
export async function incrementGlobalFailure(env: Env): Promise<void> {
  await incrementCounter(env, "global:total_failures");
}
