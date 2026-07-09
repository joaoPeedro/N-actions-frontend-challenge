import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Vite 8 plugin types differ from Vitest's bundled Vite — runtime is compatible.
  plugins: [react()] as never,
  test: {
    environment: "node",
    globals: true,
    env: {
      TZ: "UTC",
    },
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./app/shared"),
      "@features": path.resolve(__dirname, "./app/features"),
    },
  },
});
