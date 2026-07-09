import path from "node:path";
import { fileURLToPath } from "node:url";

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Force reload config to pick up the brand-isolated catalog slice and components
  plugins: [reactRouter()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./app/shared"),
      "@features": path.resolve(__dirname, "./app/features"),
    },
  },
});
