# Auth314 Web

The Auth314 marketing site (auth314.com). Private repo -- this is separate
from the [core Auth314 service](https://github.com/Psalm2517/auth314)
(the Worker API and the Pi sign-in/callback flow at app.auth314.com), which
is open source.

## Structure

- `index.html` / `src/pages/Landing.tsx` -- the landing page
- `privacy.html` / `src/pages/PrivacyPolicy.tsx` -- privacy policy
- `public/validation-key.txt` -- Pi domain ownership verification file

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs to `dist/`. Deployed via Cloudflare Pages (build command
`npm install && npm run build`, output directory `dist`).
