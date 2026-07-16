import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleAuthCallback } from "../src/routes/callback";
import { createSession } from "../src/lib/session";
import { getIdentity, getSession, putSession } from "../src/lib/kv";
import { makeEnv } from "./helpers";
import type { Env, SessionRecord } from "../src/types";

function post(body: unknown): Request {
  return new Request("https://api.example/auth/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function seedSession(
  env: Env,
  overrides: Partial<SessionRecord> = {},
): Promise<string> {
  const { token, record } = await createSession(env, {
    platform: "discord",
    platform_user_id: "123456789",
    guild_id: "987654321",
    callback_url: "https://cb.example/verified",
  });
  if (Object.keys(overrides).length) {
    await putSession(env, token, { ...record, ...overrides });
  }
  return token;
}

/** Mock fetch: Pi /me returns identity, callback_url returns 200. */
function mockHappyFetch() {
  return vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("api.minepi.com/v2/me")) {
      return new Response(
        JSON.stringify({ uid: "pi-uid-1", username: "pioneer" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
    return new Response(null, { status: 200 });
  });
}

describe("POST /auth/callback", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockHappyFetch());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requires access_token and session", async () => {
    expect((await handleAuthCallback(post({ session: "x" }), makeEnv())).status).toBe(400);
    expect((await handleAuthCallback(post({ access_token: "x" }), makeEnv())).status).toBe(400);
  });

  it("404s for an unknown session", async () => {
    const res = await handleAuthCallback(
      post({ access_token: "tok", session: "nope" }),
      makeEnv(),
    );
    expect(res.status).toBe(404);
  });

  it("verifies, stores identity, delivers callback, and marks session used", async () => {
    const env = makeEnv();
    const token = await seedSession(env);
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;

    const res = await handleAuthCallback(
      post({ access_token: "user-token", session: token }),
      env,
    );
    expect(res.status).toBe(200);
    const data = (await res.json()) as { status: string; pi_username: string };
    expect(data.status).toBe("verified");
    expect(data.pi_username).toBe("pioneer");

    // Identity persisted.
    const identity = await getIdentity(env, "pi-uid-1");
    expect(identity?.pi_username).toBe("pioneer");
    expect(identity?.platform_user_id).toBe("123456789");

    // Session marked used.
    expect((await getSession(env, token))?.used).toBe(true);

    // /me called with the user's bearer token.
    const meCall = fetchMock.mock.calls.find((c) =>
      String(c[0]).includes("/v2/me"),
    );
    expect((meCall?.[1] as RequestInit).headers).toMatchObject({
      Authorization: "Bearer user-token",
    });

    // Callback delivered with only a verified signal -- no Pi identity data.
    const cbCall = fetchMock.mock.calls.find((c) =>
      String(c[0]).includes("cb.example"),
    );
    expect(JSON.parse((cbCall?.[1] as RequestInit).body as string)).toEqual({
      platform_user_id: "123456789",
      guild_id: "987654321",
      verified: true,
    });
  });

  it("rejects a session that was already used (one-time use)", async () => {
    const env = makeEnv();
    const token = await seedSession(env, { used: true });
    const res = await handleAuthCallback(
      post({ access_token: "tok", session: token }),
      env,
    );
    expect(res.status).toBe(409);
  });

  it("cannot be replayed after a successful verification", async () => {
    const env = makeEnv();
    const token = await seedSession(env);
    const first = await handleAuthCallback(
      post({ access_token: "tok", session: token }),
      env,
    );
    expect(first.status).toBe(200);
    const second = await handleAuthCallback(
      post({ access_token: "tok", session: token }),
      env,
    );
    expect(second.status).toBe(409);
  });

  it("rejects an expired session", async () => {
    const env = makeEnv();
    const token = await seedSession(env, {
      expires_at: new Date(Date.now() - 1000).toISOString(),
    });
    const res = await handleAuthCallback(
      post({ access_token: "tok", session: token }),
      env,
    );
    expect(res.status).toBe(410);
  });

  it("returns 401 when Pi rejects the access token", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("unauthorized", { status: 401 })),
    );
    const env = makeEnv();
    const token = await seedSession(env);
    const res = await handleAuthCallback(
      post({ access_token: "bad", session: token }),
      env,
    );
    expect(res.status).toBe(401);
    // Session was already consumed before the Pi call, so a retry is rejected.
    expect((await getSession(env, token))?.used).toBe(true);
  });

  it("returns 502 when callback delivery fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === "string" ? input : input.toString();
        if (url.includes("/v2/me")) {
          return new Response(
            JSON.stringify({ uid: "u", username: "n" }),
            { status: 200 },
          );
        }
        return new Response(null, { status: 500 });
      }),
    );
    const env = makeEnv();
    const token = await seedSession(env);
    const res = await handleAuthCallback(
      post({ access_token: "tok", session: token }),
      env,
    );
    expect(res.status).toBe(502);
  });
});
