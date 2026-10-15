import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Build-time validation: Fail production CI/Vercel builds if localhost is explicitly specified
  if (
    command === "build" &&
    mode === "production" &&
    (process.env.VERCEL || process.env.CI)
  ) {
    const rawApiUrl = env.VITE_API_BASE_URL;
    if (rawApiUrl && rawApiUrl.includes("localhost")) {
      throw new Error(
        `[BUILD ERROR] Production deployment cannot use localhost API URL (VITE_API_BASE_URL=${rawApiUrl}). Please configure VITE_API_BASE_URL=https://api.expeditionsgeorgeofthejungle.com/api/v1/ in Vercel project settings.`
      );
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
    },
  };
});
