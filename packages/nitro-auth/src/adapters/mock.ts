import type { AuthAdapter, AuthConfig } from "../types";
import type { H3Event } from "h3";

export const mockAdapter: AuthAdapter = {
  name: "mock",
  authenticate: (_event: H3Event, _config: AuthConfig) => ({ ok: true }),
};
