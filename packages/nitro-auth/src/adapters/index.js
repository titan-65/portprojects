import { apiKeyAdapter } from "./api-key.js";
import { basicAdapter } from "./basic.js";
import { bearerAdapter } from "./bearer.js";
import { mockAdapter } from "./mock.js";
export const adapters = [
    apiKeyAdapter,
    bearerAdapter,
    basicAdapter,
    mockAdapter,
];
export const getAdapter = (provider) => {
    return adapters.find((adapter) => adapter.name === provider) ?? mockAdapter;
};
export { apiKeyAdapter, bearerAdapter, basicAdapter, mockAdapter };
