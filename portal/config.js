// Auth314 portal configuration.
//
// These values are PUBLIC (OAuth client_id and the authorize endpoint are not
// secrets). Edit them for your deployment, or generate this file at deploy time.
window.AUTH314_CONFIG = {
  // Cloudflare Worker API base URL (no trailing slash).
  API_BASE_URL: "https://api.auth314.com",

  // Pi OAuth client id.
  PI_OAUTH_CLIENT_ID: "30XoECv68xupayqApaev4rypRZ4jxMYl8OVO15ZaDSE",

  // Pi authorize endpoint — unconfirmed, easy to swap.
  PI_AUTHORIZE_BASE_URL: "https://auth.minepi.com/oauth/authorize",

  // This portal's own production base URL. Note: the OAuth redirect_uri is
  // derived from window.location.origin at click time (see index.html), so the
  // dev URL auth314.pages.dev works too. This value is informational here.
  PORTAL_BASE_URL: "https://auth314.com",
};
