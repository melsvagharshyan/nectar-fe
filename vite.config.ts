import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server: {
    host: "localhost",
    port: 5173,
    open: true,
    proxy: {
      "/api": process.env.API_PROXY_TARGET ?? "http://localhost:4000",
    },
  },
  preview: {
    host: "localhost",
    port: 4173,
    open: true,
  },
});
