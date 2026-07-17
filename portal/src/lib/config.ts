export interface Auth314Config {
  API_BASE_URL: string;
  PI_OAUTH_CLIENT_ID: string;
  PI_AUTHORIZE_BASE_URL: string;
  PORTAL_BASE_URL: string;
}

declare global {
  interface Window {
    AUTH314_CONFIG?: Auth314Config;
  }
}

// Loaded at runtime from /config.js (see public/config.js), not baked into
// the build. This lets the deployed config be edited without a rebuild.
export function getConfig(): Auth314Config {
  return (
    window.AUTH314_CONFIG ?? {
      API_BASE_URL: "",
      PI_OAUTH_CLIENT_ID: "",
      PI_AUTHORIZE_BASE_URL: "",
      PORTAL_BASE_URL: "",
    }
  );
}
