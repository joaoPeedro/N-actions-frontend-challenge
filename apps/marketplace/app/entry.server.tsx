import { PassThrough } from "node:stream";

import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { AsyncLocalStorage } from "node:async_hooks";
import { renderToPipeableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";

const requestStorage = new AsyncLocalStorage<string>();
(globalThis as unknown as { requestStorage: typeof requestStorage }).requestStorage = requestStorage;

if (import.meta.env.DEV) {
  try {
    await import("./shared/api/mocks/server");
  } catch (err) {
    console.error("Failed to load MSW server mocks", err);
  }
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  const origin = new URL(request.url).origin;
  return requestStorage.run(origin, () => {
    return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");
    const isBot = userAgent ? isbot(userAgent) : false;

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [isBot ? "onAllReady" : "onShellReady"]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, 5000);
  });
 });
}
