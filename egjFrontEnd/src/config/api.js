export const PRODUCTION_API_URL =
  "https://api.expeditionsgeorgeofthejungle.com/api/v1/";
export const LOCAL_DEV_API_URL = "http://localhost:5001/api/v1/";

const configuredUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Resolves the active API base URL.
 * In production builds, ensures requests never fall back to localhost.
 * In development, preserves the local developer environment (http://localhost:5001/api/v1/).
 */
function resolveApiBaseUrl() {
  if (import.meta.env.PROD) {
    // If environment explicitly provides a non-localhost URL, use it
    if (configuredUrl && !configuredUrl.includes("localhost")) {
      return configuredUrl;
    }
    // Safe production fallback: confirmed production API
    return PRODUCTION_API_URL;
  }

  // Development mode fallback
  return configuredUrl || LOCAL_DEV_API_URL;
}

export const API_BASE_URL = resolveApiBaseUrl();
