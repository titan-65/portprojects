import { apiKeyAdapter } from "./api-key.js";
import { basicAdapter } from "./basic.js";
import { bearerAdapter } from "./bearer.js";
import { mockAdapter } from "./mock.js";
import type { AuthAdapter, AuthProvider } from "../types.js";
export declare const adapters: AuthAdapter[];
export declare const getAdapter: (provider: AuthProvider) => AuthAdapter;
export { apiKeyAdapter, bearerAdapter, basicAdapter, mockAdapter };
//# sourceMappingURL=index.d.ts.map