import type { Env } from "../types";

interface ApiKeyRecord {
  id: string;
  name: string;
  discord_user_id: string;
  created_at: string;
  last_used_at: string | null;
}

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function validateApiKey(env: Env, req: Request): Promise<boolean> {
  const header = req.headers.get("Authorization") ?? "";
  const key = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!key.startsWith("auth314_")) return false;

  const hash = await sha256(key);
  const raw = await env.AUTH314_KV.get(`apikey:hash:${hash}`);
  if (!raw) return false;

  // Update last_used_at in the background
  const record = JSON.parse(raw) as ApiKeyRecord;
  const updated: ApiKeyRecord = { ...record, last_used_at: new Date().toISOString() };
  env.AUTH314_KV.put(`apikey:hash:${hash}`, JSON.stringify(updated)).catch(() => {});

  return true;
}
