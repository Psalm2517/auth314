# Auth314

Auth314 is verification infrastructure for "Sign in with Pi." It handles the
Pi Network OAuth flow on an operator's behalf and delivers a single signal —
whether a user successfully verified their Pi account — to that operator's
webhook. Auth314 is not affiliated with Pi Network or the Pi Core Team.

Live service: [auth314.com](https://auth314.com) · Dashboard: [dashboard.auth314.com](https://dashboard.auth314.com)

## What's in this repo

This is the core service: a Cloudflare Worker (API) and a static portal
(the page end users complete Pi sign-in on).

```
worker/   Cloudflare Worker — session/verification API, API key auth, KV storage
portal/   Static UI served at app.auth314.com — Pi OAuth callback handling,
          privacy policy, terms of service
```

## How it works

1. An operator calls `POST /verify/init` with an API key, a `platform_user_id`
   to verify, and a `callback_url` to receive the result. Auth314 returns a
   `verify_url`.
2. The end user opens `verify_url`, which runs the Pi Sign-in OAuth flow
   against Pi Network's own servers.
3. Once the user approves, Auth314 verifies the resulting access token
   against the Pi Platform API and POSTs a one-time result to the operator's
   `callback_url`: `{ platform_user_id, guild_id, verified: true }`.

Pi identity (the user's Pi UID and username) is never included in that
callback. Per Pi's Developer Terms of Use, it stays internal to Auth314 and
is not shared with operators or any third party — operators only learn
*that* a user verified, not *who* they are on Pi Network.

Each Pi account maps to exactly one verified platform identity at a time;
re-verifying with a different platform account automatically revokes the
previous one.

## Related repos

- [`auth314-dashboard`](https://github.com/Psalm2517/auth314-dashboard) — operator dashboard (API keys, usage, verification log)
- [`auth314-discord-bot`](https://github.com/Psalm2517/auth314-discord-bot) — reference Discord integration built on this API

## License

See [LICENSE](./LICENSE). Commercial use outside the terms of that license
requires a separate agreement — see the [Terms of Service](https://app.auth314.com/tos.html).
