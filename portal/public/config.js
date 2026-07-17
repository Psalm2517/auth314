// Auth314 portal configuration.
//
// These values are PUBLIC. Edit them for your deployment, or generate this
// file at deploy time. Loaded at runtime (not baked into the build), so it
// can be edited without a rebuild.
window.AUTH314_CONFIG = {
  // Cloudflare Worker API base URL (no trailing slash).
  API_BASE_URL: "https://app.auth314.com",

  // Pi OAuth client id, from the Pi Developer Portal.
  PI_OAUTH_CLIENT_ID: "30XoECv68xupayqApaev4rypRZ4JxMYl8OVO15ZaDSE",

  // Pi Sign-in OAuth authorize endpoint (confirmed, per Pi's pi-sign-in.md).
  PI_AUTHORIZE_BASE_URL: "https://accounts.pinet.com/oauth/authorize",

  PORTAL_BASE_URL: "https://app.auth314.com",
};
