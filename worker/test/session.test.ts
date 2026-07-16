import { describe, it, expect } from "vitest";
import {
  createSession,
  generateToken,
  isSessionExpired,
} from "../src/lib/session";
import { getSession } from "../src/lib/kv";
import type { SessionRecord } from "../src/types";
import { makeEnv } from "./helpers";

describe("generateToken", () => {
  it("produces URL-safe tokens with no padding", () => {
    for (let i = 0; i < 50; i++) {
      const t = generateToken();
      expect(t).toMatch(/^[A-Za-z0-9_-]+$/);
      expect(t).not.toContain("=");
      expect(t.length).toBeGreaterThan(20);
    }
  });

  it("produces unique tokens", () => {
    const set = new Set<string>();
    for (let i = 0; i < 200; i++) set.add(generateToken());
    expect(set.size).toBe(200);
  });
});

describe("isSessionExpired", () => {
  const base: Omit<SessionRecord, "expires_at"> = {
    platform: "discord",
    platform_user_id: "1",
    guild_id: "g",
    callback_url: "https://cb.example",
    used: false,
  };

  it("returns false for a future expiry", () => {
    const rec: SessionRecord = {
      ...base,
      expires_at: new Date(Date.now() + 60_000).toISOString(),
    };
    expect(isSessionExpired(rec)).toBe(false);
  });

  it("returns true for a past expiry", () => {
    const rec: SessionRecord = {
      ...base,
      expires_at: new Date(Date.now() - 1_000).toISOString(),
    };
    expect(isSessionExpired(rec)).toBe(true);
  });
});

describe("createSession", () => {
  it("persists a fresh, unused session with a ~10 minute TTL", async () => {
    const env = makeEnv();
    const before = Date.now();
    const { token, record } = await createSession(env, {
      platform: "telegram",
      platform_user_id: "42",
      guild_id: "chat-1",
      callback_url: "https://cb.example/verified",
    });

    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(record.used).toBe(false);
    expect(record.platform).toBe("telegram");

    const expiresMs = new Date(record.expires_at).getTime();
    // Within 10 min (+ small slack) of creation.
    expect(expiresMs).toBeGreaterThanOrEqual(before + 10 * 60 * 1000 - 1000);
    expect(expiresMs).toBeLessThanOrEqual(Date.now() + 10 * 60 * 1000 + 1000);

    const stored = await getSession(env, token);
    expect(stored).toEqual(record);
  });
});
