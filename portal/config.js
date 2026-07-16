// Auth314 portal configuration.
//
// These values are PUBLIC (OAuth client_id and the authorize endpoint are not
// secrets). Edit them for your deployment, or generate this file at deploy time.
window.AUTH314_CONFIG = {
  // Cloudflare Worker API base URL (no trailing slash).
  API_BASE_URL: "https://auth314.workers.dev",

  // Pi OAuth client id.
  PI_OAUTH_CLIENT_ID: "REPLACE_WITH_PI_OAUTH_CLIENT_ID",

  // Pi authorize endpoint — unconfirmed, easy to swap.
  PI_AUTHORIZE_BASE_URL: "https://auth.minepi.com/oauth/authorize",

  // This portal's own base URL (used to build the OAuth redirect_uri).
  PORTAL_BASE_URL: "https://auth314.pages.dev",
};
