import type { H3Event } from "h3";
export type AuthProvider = "apiKey" | "bearer" | "basic" | "mock";
export interface AuthConfig {
    provider?: AuthProvider;
    bypassPaths?: string[];
    apiKeys?: string[];
    bearerTokens?: string[];
    basicAuth?: {
        username: string;
        password: string;
    };
}
export interface AuthResult {
    ok: boolean;
    reason?: string;
}
export interface AuthAdapter {
    name: AuthProvider;
    authenticate: (event: H3Event, config: AuthConfig) => Promise<AuthResult> | AuthResult;
}
//# sourceMappingURL=types.d.ts.map