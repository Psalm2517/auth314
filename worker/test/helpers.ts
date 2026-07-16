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
    PI_OAUTH_CLIENT_ID: "test-client-id",
    PI_API_KEY: "test-api-key",
    PI_AUTHORIZE_BASE_URL: "https://auth.example/oauth/authorize",
    PORTAL_BASE_URL: "https://portal.example",
    ...overrides,
  };
}
