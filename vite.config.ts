/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// In vitest.config.js add (if you haven't already)
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  test: {
    setupFiles: ["./vitest-setup.ts"],
    globals: true,
    environment: "jsdom",
    // ...
  },
});
