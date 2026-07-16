import type { Env, IdentityRecord, SessionRecord } from "../types";

const SESSION_TTL_SECONDS = 10 * 60; // 10 minutes

function sessionKey(token: string): string {
  return `session:${token}`;
}

function identityKey(piUid: string): string {
  return `identity:${piUid}`;
}

export async function putSession(
  env: Env,
  token: string,
  record: SessionRecord,
): Promise<void> {
  await env.AUTH314_KV.put(sessionKey(token), JSON.stringify(record), {
    expirationTtl: SESSION_TTL_SECONDS,
  });
}

export async function getSession(
  env: Env,
  token: string,
): Promise<SessionRecord | null> {
  const raw = await env.AUTH314_KV.get(sessionKey(token));
  if (!raw) return null;
  return JSON.parse(raw) as SessionRecord;
}

export async function markSessionUsed(
  env: Env,
  token: string,
  record: SessionRecord,
): Promise<void> {
  const updated: SessionRecord = { ...record, used: true };
  // Preserve the remaining TTL loosely; the session is one-time use so a short
  // window is enough to guard against races while it naturally expires.
  await env.AUTH314_KV.put(sessionKey(token), JSON.stringify(updated), {
    expirationTtl: SESSION_TTL_SECONDS,
  });
}

export async function putIdentity(
  env: Env,
  record: IdentityRecord,
): Promise<void> {
  // Identities are permanent — no TTL.
  await env.AUTH314_KV.put(identityKey(record.pi_uid), JSON.stringify(record));
}

export async function getIdentity(
  env: Env,
  piUid: string,
): Promise<IdentityRecord | null> {
  const raw = await env.AUTH314_KV.get(identityKey(piUid));
  if (!raw) return null;
  return JSON.parse(raw) as IdentityRecord;
}
