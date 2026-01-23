# nitro-auth

A lightweight Nitro plugin that adds pluggable auth adapters (API key, bearer token, basic auth, and mock).

## Install

```bash
pnpm add nitro-auth
```

## Usage (Nitro)

```ts
// nitro.config.ts
import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  plugins: ["nitro-auth"],
  runtimeConfig: {
    auth: {
      provider: "apiKey",
      apiKeys: ["dev-key"],
      bypassPaths: ["/health", "/api/seed"],
    },
  },
});
```

### Providers

| Provider | Config | Header |
| --- | --- | --- |
| `apiKey` | `apiKeys` | `x-api-key` |
| `bearer` | `bearerTokens` | `Authorization: Bearer <token>` |
| `basic` | `basicAuth` | `Authorization: Basic <base64>` |
| `mock` | none | (always OK) |

### Runtime config shape

```ts
export interface AuthConfig {
  provider?: "apiKey" | "bearer" | "basic" | "mock";
  bypassPaths?: string[];
  apiKeys?: string[];
  bearerTokens?: string[];
  basicAuth?: {
    username: string;
    password: string;
  };
}
```

## Adapter imports

```ts
import type { AuthAdapter } from "nitro-auth/types";
import { apiKeyAdapter, bearerAdapter } from "nitro-auth/adapters";
```
