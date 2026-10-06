import { defineConfig } from "@playwright/test";

const PORT = 5180;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  reporter: "line",
  use: {
    baseURL: `http://localhost:${PORT}/`,
    channel: process.env.PW_CHANNEL || undefined,
  },
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/`,
    // E2E_API_URL points both the app and the specs at the same backend (default: .env).
    env: {
      BROWSER: "none",
      ...(process.env.E2E_API_URL && { VITE_API_URL: process.env.E2E_API_URL }),
    },
    reuseExistingServer: !process.env.CI,
  },
});
