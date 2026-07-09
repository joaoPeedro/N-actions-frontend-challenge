import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "apps/marketplace/vitest.config.ts",
  "packages/design-system/vitest.config.ts",
]);
