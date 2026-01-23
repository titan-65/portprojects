import { getHeader } from "h3";

import type { AuthAdapter, AuthConfig } from "../types";
import type { H3Event } from "h3";

export const bearerAdapter: AuthAdapter = {
  name: "bearer",
  authenticate: (event: H3Event, config: AuthConfig) => {
    const authHeader = getHeader(event, "authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    const allowed = config.bearerTokens ?? [];

    if (!allowed.length) {
      return { ok: false, reason: "No bearer tokens configured." };
    }

    return {
      ok: Boolean(token) && allowed.includes(token),
      reason: "Invalid bearer token.",
    };
  },
};
