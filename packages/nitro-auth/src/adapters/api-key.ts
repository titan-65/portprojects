import { getHeader } from "h3";

import type { AuthAdapter, AuthConfig } from "../types.js";
import type { H3Event } from "h3";

export const apiKeyAdapter: AuthAdapter = {
  name: "apiKey",
  authenticate: (event: H3Event, config: AuthConfig) => {
    const apiKey = getHeader(event, "x-api-key") ?? "";
    const allowed = config.apiKeys ?? [];

    if (!allowed.length) {
      return { ok: false, reason: "No API keys configured." };
    }

    return {
      ok: allowed.includes(apiKey),
      reason: "Invalid API key.",
    };
  },
};
