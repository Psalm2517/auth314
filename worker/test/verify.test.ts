import { describe, it, expect } from "vitest";
import { handleVerifyInit } from "../src/routes/verify";
import { getSession } from "../src/lib/kv";
import { makeEnv } from "./helpers";

function post(body: unknown): Request {
  return new Request("https://api.example/verify/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /verify/init validation", () => {
  it("rejects an unknown platform", async () => {
    const res = await handleVerifyInit(
      post({
        platform: "slack",
        platform_user_id: "1",
        callback_url: "https://cb.example",
      }),
      makeEnv(),
    );
    expect(res.status).toBe(400);
  });

  it("rejects a missing platform_user_id", async () => {
    const res = await handleVerifyInit(
      post({ platform: "discord", callback_url: "https://cb.example" }),
      makeEnv(),
    );
    expect(res.status).toBe(400);
  });

  it("rejects a non-https callback_url", async () => {
    const res = await handleVerifyInit(
      post({
        platform: "discord",
        platform_user_id: "1",
        callback_url: "http://cb.example",
      }),
      makeEnv(),
    );
    expect(res.status).toBe(400);
  });

  it("rejects a malformed callback_url", async () => {
    const res = await handleVerifyInit(
      post({
        platform: "discord",
        platform_user_id: "1",
        callback_url: "not-a-url",
      }),
      makeEnv(),
    );
    expect(res.status).toBe(400);
  });

  it("rejects an invalid JSON body", async () => {
    const req = new Request("https://api.example/verify/init", {
      method: "POST",
      body: "{not json",
    });
    const res = await handleVerifyInit(req, makeEnv());
    expect(res.status).toBe(400);
  });

  it("creates a session and returns a portal verify_url", async () => {
    const env = makeEnv();
    const res = await handleVerifyInit(
      post({
        platform: "discord",
        platform_user_id: "123456789",
        guild_id: "987654321",
        callback_url: "https://cb.example/verified",
      }),
      env,
    );
    expect(res.status).toBe(200);
    const data = (await res.json()) as {
      verify_url: string;
      session: string;
      expires_at: string;
    };
    expect(data.session).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(data.verify_url).toBe(
      `${env.PORTAL_BASE_URL}/?session=${encodeURIComponent(data.session)}`,
    );

    const stored = await getSession(env, data.session);
    expect(stored?.used).toBe(false);
    expect(stored?.platform).toBe("discord");
    expect(stored?.guild_id).toBe("987654321");
  });

  it("sets CORS headers on responses", async () => {
    const res = await handleVerifyInit(
      post({
        platform: "discord",
        platform_user_id: "1",
        callback_url: "https://cb.example",
      }),
      makeEnv(),
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});
