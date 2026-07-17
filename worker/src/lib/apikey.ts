import type { Env } from "../types";

export interface ApiKeyRecord {
  id: string;
  name: string;
  discord_user_id: string;
  created_at: string;
  last_used_at: string | null;
  verification_count: number;
}

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function validateApiKey(env: Env, req: Request): Promise<ApiKeyRecord | null> {
  const header = req.headers.get("Authorization") ?? "";
  const key = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!key.startsWith("auth314_")) return null;

  const hash = await sha256(key);
  const raw = await env.AUTH314_KV.get(`apikey:hash:${hash}`);
  if (!raw) return null;

  const record = JSON.parse(raw) as ApiKeyRecord;

  // Rate limit: 60 requests per minute per key
  const minute = Math.floor(Date.now() / 60_000);
  const rlKey = `ratelimit:${record.id}:${minute}`;
  const countRaw = await env.AUTH314_KV.get(rlKey);
  const count = countRaw ? parseInt(countRaw, 10) : 0;
  if (count >= 60) return null;

  // Increment rate limit counter (fire and forget)
  env.AUTH314_KV.put(rlKey, String(count + 1), { expirationTtl: 120 }).catch(() => {});

  // Update last_used_at (fire and forget)
  const updated: ApiKeyRecord = {
    ...record,
    last_used_at: new Date().toISOString(),
    verification_count: (record.verification_count ?? 0) + 1,
  };
  env.AUTH314_KV.put(`apikey:hash:${hash}`, JSON.stringify(updated)).catch(() => {});

  return record;
}
