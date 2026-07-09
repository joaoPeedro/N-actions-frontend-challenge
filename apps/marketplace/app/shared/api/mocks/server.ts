import { setupServer } from "msw/node";

import { handlers } from "./handlers";
import { onUnhandledRequest } from "./on-unhandled-request";

export const server = setupServer(...handlers);

if (typeof window === "undefined" && import.meta.env.DEV && !import.meta.env.VITEST) {
  server.listen({ onUnhandledRequest });
  console.warn("[MSW] Server-side interception started.");
}
