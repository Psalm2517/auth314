# Auth314 — Pi Sign-in OAuth Bridge (Core Service)

Auth314 is a hosted Pi Network OAuth verification service. Communities integrate
with it via platform-specific bots (Discord, Telegram, etc.) that call Auth314's
API. End users visit the Auth314 portal to complete Pi Sign-in, and Auth314 calls
back to the platform integration once verified.

**This repo is the core service only** — no Discord or Telegram code lives here.

## Architecture

- **Portal** (`/portal`) — vanilla HTML/JS, deployed to **Cloudflare Pages**.
- **API** (`/worker`) — **Cloudflare Worker** (Wrangler project).
- **Storage** — **Cloudflare KV** for sessions (10-min TTL, one-time use) and
  permanent identity mappings.

```
/portal              index.html, callback.html, config.js, styles.css
/worker
  src/
    index.ts         router + CORS
    types.ts         shared types
    routes/          verify.ts, callback.ts, health.ts
    lib/             pi.ts, kv.ts, session.ts, http.ts (CORS/JSON helpers)
wrangler.toml
.env.example
```

## Verification flow

1. A platform bot calls `POST /api/verify/init` → gets a `verify_url` with a
   one-time session token.
2. The user opens the portal (`/?session=…`) and clicks **Verify with Pi**.
3. The portal redirects to the Pi authorize endpoint (`response_type=token`).
4. Pi redirects back to `/callback.html#access_token=…`.
5. `callback.html` POSTs `{ access_token, session }` to `POST /api/auth/callback`.
6. The Worker validates the session (reject if expired/used), marks it used,
   verifies the token against `GET https://api.minepi.com/v2/me`, stores the
   identity, and POSTs the result to the bot's `callback_url`.

## API endpoints

| Method | Path                 | Purpose                                   |
| ------ | -------------------- | ----------------------------------------- |
| POST   | `/api/verify/init`   | Integration starts a verification session |
| POST   | `/api/auth/callback` | Portal submits access token + session     |
| GET    | `/api/health`        | Health check (200 OK)                     |

CORS is enabled for all origins — integrations call the API from external
domains.

## Environment variables

| Variable                | Type   | Where                     |
| ----------------------- | ------ | ------------------------- |
| `PI_OAUTH_CLIENT_ID`    | secret | `wrangler secret put`     |
| `PI_API_KEY`            | secret | `wrangler secret put`     |
| `PI_AUTHORIZE_BASE_URL` | config | `wrangler.toml` `[vars]`  |
| `PORTAL_BASE_URL`       | config | `wrangler.toml` `[vars]`  |

> `PI_AUTHORIZE_BASE_URL` is a config variable because the correct Pi authorize
> endpoint is unconfirmed — swap it in `wrangler.toml` (and `portal/config.js`)
> without touching code.

See `.env.example` for the full list. **No secrets are ever hardcoded.**

## Setup

Assumes a fresh environment.

### 1. Clone and install

```bash
git clone <this-repo> auth314
cd auth314/worker
npm install
```

### 2. Authenticate Wrangler

Wrangler is **not** authenticated by default. Log in first:

```bash
npx wrangler login
```

### 3. Create the KV namespace

From the repo root:

```bash
npx wrangler kv:namespace create AUTH314_KV
npx wrangler kv:namespace create AUTH314_KV --preview
```

Copy the returned `id` and `preview_id` into `wrangler.toml` under
`[[kv_namespaces]]`, replacing the `REPLACE_WITH_…` placeholders.

### 4. Set secrets and config

```bash
npx wrangler secret put PI_OAUTH_CLIENT_ID
npx wrangler secret put PI_API_KEY
```

Edit the non-secret `[vars]` in `wrangler.toml` (`PI_AUTHORIZE_BASE_URL`,
`PORTAL_BASE_URL`) as needed.

For local dev, put secrets in a git-ignored `.dev.vars` file at the repo root:

```
PI_OAUTH_CLIENT_ID=...
PI_API_KEY=...
```

### 5. Deploy the Worker

```bash
cd worker
npm run typecheck   # optional
npx wrangler deploy
```

Note the deployed Worker URL (e.g. `https://auth314-worker.<subdomain>.workers.dev`).

### 6. Deploy the portal (Cloudflare Pages)

Edit `portal/config.js` and set:

- `API_BASE_URL` → your deployed Worker URL
- `PI_OAUTH_CLIENT_ID` → your Pi OAuth client id (public)
- `PI_AUTHORIZE_BASE_URL` → same value as the Worker config
- `PORTAL_BASE_URL` → the Pages URL you'll deploy to

Then deploy the static `portal/` directory:

```bash
npx wrangler pages deploy portal --project-name auth314
```

(Or connect the repo in the Cloudflare Pages dashboard with build output
directory `portal`.)

### 7. Register the OAuth redirect

In your Pi developer settings, register the redirect URI:

```
<PORTAL_BASE_URL>/callback.html
```

## Tests & CI

Unit tests cover the session/validation logic and the full callback flow
(one-time use, expiry, Pi verification, identity storage, callback delivery):

```bash
cd worker
npm test          # vitest
npm run typecheck # tsc --noEmit
```

GitHub Actions (`.github/workflows/ci.yml`) runs both on every push to `main`
and on pull requests.

## Local development

```bash
cd worker
npx wrangler dev
```

Serves the API locally with the preview KV namespace. Serve the portal with any
static file server (e.g. `npx serve portal`) and point `config.js`
`API_BASE_URL` at the local Worker.

## License

MIT — see [LICENSE](./LICENSE).
