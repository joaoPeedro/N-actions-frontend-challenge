import type { SharedOptions } from "msw";

/**
 * MSW must not passthrough Vite dev-server requests (bypass mode breaks module loading).
 * Only warn for unhandled API calls.
 */
export const onUnhandledRequest: NonNullable<SharedOptions["onUnhandledRequest"]> = (
  request,
  print,
) => {
  const { pathname } = new URL(request.url);

  if (
    pathname.startsWith("/@") ||
    pathname.startsWith("/app/") ||
    pathname.startsWith("/node_modules/") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  if (pathname.startsWith("/api/")) {
    print.warning();
  }
};
