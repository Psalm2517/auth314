// Auth314 portal configuration.
//
// These values are PUBLIC. Edit them for your deployment, or generate this
// file at deploy time.
window.AUTH314_CONFIG = {
  // Cloudflare Worker API base URL (no trailing slash).
  API_BASE_URL: "https://api.auth314.com",

  // Pi OAuth client id. Currently unused by index.html (the Pi Browser SDK
  // flow via window.Pi.authenticate() doesn't need it — the app is
  // identified by domain registration in the Pi Developer Portal instead).
  // Kept for callback.html in case the OAuth redirect flow is reactivated.
  PI_OAUTH_CLIENT_ID: "30XoECv68xupayqApaev4rypRZ4jxMYl8OVO15ZaDSE",

  // PI_AUTHORIZE_BASE_URL: no longer used — the portal now uses the Pi
  // Browser SDK (window.Pi.authenticate) and pi:// deep links instead of the
  // OAuth authorize-endpoint redirect. Uncomment if that flow comes back:
  // PI_AUTHORIZE_BASE_URL: "https://auth.minepi.com/oauth/authorize",

  // This portal's own production base URL.
  PORTAL_BASE_URL: "https://auth314.com",
};
