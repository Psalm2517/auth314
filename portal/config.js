// Auth314 portal configuration.
//
// These values are PUBLIC. Edit them for your deployment, or generate this
// file at deploy time.
window.AUTH314_CONFIG = {
  // Cloudflare Worker API base URL (no trailing slash).
  API_BASE_URL: "https://api.auth314.com",

  // Pi OAuth client id, from the Pi Developer Portal.
  PI_OAUTH_CLIENT_ID: "30XoECv68xupayqApaev4rypRZ4jxMYl8OVO15ZaDSE",

  // Pi Sign-in OAuth authorize endpoint (confirmed, per Pi's pi-sign-in.md).
  PI_AUTHORIZE_BASE_URL: "https://accounts.pinet.com/oauth/authorize",

  // This portal's own production base URL.
  PORTAL_BASE_URL: "https://auth314.com",
};
