import { apiKeyAdapter } from "./api-key";
import { basicAdapter } from "./basic";
import { bearerAdapter } from "./bearer";
import { mockAdapter } from "./mock";
import type { AuthAdapter, AuthProvider } from "../types";

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
