import type { Env } from "../types";

export interface ApiKeyRecord {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  last_used_at: string | null;
  verification_count: number;
}

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export const FREE_TIER_RATE_LIMIT_PER_MIN = 5;
export const FREE_TIER_MONTHLY_QUOTA = 100;

export type ApiKeyValidationResult =
  | { ok: true; record: ApiKeyRecord }
  | { ok: false; reason: "invalid" | "rate_limited" | "quota_exceeded" };

function currentMonthKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function validateApiKey(env: Env, req: Request): Promise<ApiKeyValidationResult> {
  const header = req.headers.get("Authorization") ?? "";
  const key = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!key.startsWith("auth314_")) return { ok: false, reason: "invalid" };

  const hash = await sha256(key);
  const raw = await env.AUTH314_KV.get(`apikey:hash:${hash}`);
  if (!raw) return { ok: false, reason: "invalid" };

  const record = JSON.parse(raw) as ApiKeyRecord;

  // Check if this owner has unlimited access (bypasses rate/quota enforcement,
  // but usage is still recorded so the dashboard's Usage page stays accurate).
  const unlimited = await env.AUTH314_KV.get(`owner_unlimited:${record.owner_id}`);

  const minute = Math.floor(Date.now() / 60_000);
  const rlKey = `ratelimit:${record.id}:${minute}`;
  const countRaw = await env.AUTH314_KV.get(rlKey);
  const count = countRaw ? parseInt(countRaw, 10) : 0;
  if (!unlimited && count >= FREE_TIER_RATE_LIMIT_PER_MIN) return { ok: false, reason: "rate_limited" };

  const monthKey = `usage:month:${record.id}:${currentMonthKey()}`;
  const usageRaw = await env.AUTH314_KV.get(monthKey);
  const usage = usageRaw ? parseInt(usageRaw, 10) : 0;
  if (!unlimited && usage >= FREE_TIER_MONTHLY_QUOTA) return { ok: false, reason: "quota_exceeded" };

  // Increment counters (fire and forget)
  env.AUTH314_KV.put(rlKey, String(count + 1), { expirationTtl: 120 }).catch(() => {});
  env.AUTH314_KV.put(monthKey, String(usage + 1), { expirationTtl: 60 * 60 * 24 * 40 }).catch(() => {});

  // Update last_used_at (fire and forget). verification_count is incremented
  // separately in incrementVerificationCount, once the sign-in actually
  // completes -- not here, where we've only validated the key for a request.
  const updated: ApiKeyRecord = {
    ...record,
    last_used_at: new Date().toISOString(),
  };
  env.AUTH314_KV.put(`apikey:hash:${hash}`, JSON.stringify(updated)).catch(() => {});

  return { ok: true, record };
}

/**
 * Increment a key's completed-verification counter. Called once a Pi
 * sign-in actually completes (POST /auth/callback), not on every
 * /verify/init request.
 */
export async function incrementVerificationCount(env: Env, key_id: string): Promise<void> {
  const hash = await env.AUTH314_KV.get(`apikey:id:${key_id}`);
  if (!hash) return;
  const raw = await env.AUTH314_KV.get(`apikey:hash:${hash}`);
  if (!raw) return;
  const record = JSON.parse(raw) as ApiKeyRecord;
  const updated: ApiKeyRecord = { ...record, verification_count: (record.verification_count ?? 0) + 1 };
  await env.AUTH314_KV.put(`apikey:hash:${hash}`, JSON.stringify(updated));
}
