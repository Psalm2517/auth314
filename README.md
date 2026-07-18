<div align="center">

# Auth314

**Verification infrastructure for Pi Sign-in.**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPLv3-blue.svg)](./LICENSE)
[![CI](https://github.com/Psalm2517/auth314/actions/workflows/ci.yml/badge.svg)](https://github.com/Psalm2517/auth314/actions/workflows/ci.yml)
[![Deploy](https://github.com/Psalm2517/auth314/actions/workflows/deploy.yml/badge.svg)](https://github.com/Psalm2517/auth314/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020.svg?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)

[Website](https://auth314.com) · [Docs](https://docs.auth314.com) · [Terms of Service](https://auth314.com/tos) · [Privacy Policy](https://auth314.com/privacy)

</div>

---

Auth314 handles the Pi Network OAuth flow on an operator's behalf and
delivers a single signal to a webhook: whether a user successfully verified
their Pi account. It's built for bots, apps, and websites that want to check
whether someone is a real Pi Pioneer without building and maintaining a Pi
OAuth integration themselves. Auth314 is not affiliated with Pi Network or
the Pi Core Team.

Per Pi's Developer Terms of Use, a user's Pi identity (UID and username)
stays internal to Auth314 and is never forwarded to operators or any third
party. Operators only learn that a user verified, not who they are on Pi
Network.

## How it works

1. An operator calls `POST /verify/init` with an API key, a `platform_user_id`
   to verify, and a `callback_url` to receive the result. Auth314 returns a
   `verify_url`.
2. The end user opens `verify_url` and completes the Pi Sign-in OAuth flow
   against Pi Network's own servers.
3. Auth314 verifies the resulting access token against the Pi Platform API
   and POSTs a one-time result to the operator's `callback_url`:
   `{ platform_user_id, guild_id, verified: true }`.

Each Pi account maps to exactly one verified platform identity at a time.
Re-verifying with a different platform account automatically revokes the
previous association.

## Architecture

```
worker/   Cloudflare Worker: session and verification API, API key auth, KV storage
portal/   Static page served at app.auth314.com where end users complete Pi sign-in
web/      Marketing site served at auth314.com
```

## Hosted services

- **Dashboard** — [dashboard.auth314.com](https://dashboard.auth314.com), manage API keys and view usage
- **Discord** — [Add the Auth314 bot](https://discord.com/oauth2/authorize?client_id=1527761038999683242&permissions=268437504&integration_type=0&scope=bot+applications.commands), verify Pi Pioneers and auto-assign a role
- **Telegram** — coming soon

## License

AGPL-3.0. See [LICENSE](./LICENSE). Commercial use outside the terms of the
AGPL requires a separate agreement; see the
[Terms of Service](https://auth314.com/tos).
