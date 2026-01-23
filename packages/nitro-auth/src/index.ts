import { definePlugin } from "nitro";
import { createError, getRequestURL } from "h3";
import { useRuntimeConfig } from "nitro/runtime-config";
import type { H3Event } from "h3";

import { getAdapter } from "./adapters";
import type { AuthConfig } from "./types";

export default definePlugin((nitroApp) => {
  nitroApp.hooks.hook("request", async (event: H3Event) => {
    const config = (useRuntimeConfig().auth ?? {}) as AuthConfig;
    const provider = config.provider ?? "mock";
    const adapter = getAdapter(provider);
    const url = getRequestURL(event);
    const bypassPaths = config.bypassPaths ?? [];

    if (event.method === "OPTIONS") {
      return;
    }

    if (bypassPaths.some((path) => url.pathname.startsWith(path))) {
      return;
    }

    const result = await adapter.authenticate(event, config);

    if (!result.ok) {
      throw createError({
        statusCode: 401,
        statusMessage: result.reason ?? "Unauthorized",
      });
    }
  });
});
