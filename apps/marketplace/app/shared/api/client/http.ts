const getBaseUrl = (): string => {
  // 1. Support environment variable base URL for both client and server
  const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL || (typeof process !== "undefined" ? process.env.API_BASE_URL : undefined);
  if (envApiBaseUrl) {
    return envApiBaseUrl;
  }

  // 2. Relative URLs on browser client
  if (typeof window !== "undefined") {
    return "";
  }

  // 3. Request origin storage context
  const storage = (globalThis as unknown as {
    requestStorage?: { getStore: () => string | undefined };
  }).requestStorage;
  const storeUrl = storage?.getStore();
  if (storeUrl) {
    return storeUrl;
  }

  // 4. Server-side dev/prod port fallback for initial SSR loader execution
  const port = typeof process !== "undefined" && process.env.PORT
    ? process.env.PORT
    : (import.meta.env.PROD ? "3000" : "5173");
  return `http://localhost:${port}`;
};

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const http = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
    }),
};
