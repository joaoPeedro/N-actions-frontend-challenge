import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

import { onUnhandledRequest } from "./shared/api/mocks/on-unhandled-request";

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./shared/api/mocks/browser");
    await worker.start({ onUnhandledRequest });
  }
}

prepareApp().then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
});
