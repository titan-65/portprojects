import { apiKeyAdapter } from "./api-key.js";
import { basicAdapter } from "./basic.js";
import { bearerAdapter } from "./bearer.js";
import { mockAdapter } from "./mock.js";
import type { AuthAdapter, AuthProvider } from "../types.js";

export const adapters: AuthAdapter[] = [
  apiKeyAdapter,
  bearerAdapter,
  basicAdapter,
  mockAdapter,
];

export const getAdapter = (provider: AuthProvider) => {
  return adapters.find((adapter) => adapter.name === provider) ?? mockAdapter;
};

export { apiKeyAdapter, bearerAdapter, basicAdapter, mockAdapter };
