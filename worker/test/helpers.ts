import type { Env } from "../src/types";

/** Minimal in-memory KV mock implementing the subset the code uses. */
export class MemoryKV {
  private store = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  async put(
    key: string,
    value: string,
    _opts?: { expirationTtl?: number },
  ): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  raw(): Map<string, string> {
    return this.store;
  }
}

export function makeEnv(overrides: Partial<Env> = {}): Env {
  return {
    AUTH314_KV: new MemoryKV() as unknown as KVNamespace,
    PI_API_KEY: "test-api-key",
    PORTAL_BASE_URL: "https://portal.example",
    DASHBOARD_ORIGIN: "https://dashboard.example",
    ...overrides,
  };
}

export const TEST_API_KEY = "auth314_test0000000000000000000000000000000000000000000000000000000000000000";

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/** Seeds env's KV with a valid API key record and returns the raw key. */
export async function seedApiKey(env: Env, id = "test-key-id"): Promise<string> {
  const hash = await sha256(TEST_API_KEY);
  await (env.AUTH314_KV as unknown as MemoryKV).put(
    `apikey:hash:${hash}`,
    JSON.stringify({
      id,
      name: "Test Key",
      owner_id: "test-owner",
      created_at: new Date().toISOString(),
      last_used_at: null,
      verification_count: 0,
    }),
  );
  return TEST_API_KEY;
}
