# nitro-auth

[![npm version](https://img.shields.io/npm/v/nitro-auth.svg)](https://www.npmjs.com/package/nitro-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, zero-dependency authentication middleware for [Nitro](https://nitro.unjs.io/) and [H3](https://github.com/unjs/h3).

Adds pluggable authentication adapters to your Nitro server with minimal configuration.

## Features

- 🔌 **Pluggable Adapters**: Built-in support for API Key, Bearer Token, Basic Auth, and Mock.
- 🚀 **Zero Dependencies**: Built on top of `h3` primitives.
- 🛡️ **Type Safe**: Written in TypeScript with full type definitions.
- ⚡ **Lightweight**: Minimal overhead.

## Install

```bash
# pnpm
pnpm add nitro-auth

# npm
npm install nitro-auth

# yarn
yarn add nitro-auth
```

## Usage

Add `nitro-auth` to your Nitro plugins and configure it via `runtimeConfig`.

### 1. Register the Plugin

```ts
// nitro.config.ts
import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  plugins: ["nitro-auth"],
  runtimeConfig: {
    auth: {
      // Default provider (can be overridden per request if needed in future)
      provider: "apiKey",
      // Global bypass paths (public routes)
      bypassPaths: ["/health", "/api/public"],
      
      // Provider-specific config
      apiKeys: ["my-secret-key"],
    },
  },
});
```

### 2. Configure Providers

#### API Key
Validates `x-api-key` header against a list of allowed keys.

```ts
// nitro.config.ts
runtimeConfig: {
  auth: {
    provider: "apiKey",
    apiKeys: ["secret-1", "secret-2"],
  }
}
```

#### Bearer Token
Validates `Authorization: Bearer <token>` header.

```ts
// nitro.config.ts
runtimeConfig: {
  auth: {
    provider: "bearer",
    bearerTokens: ["token-123", "token-456"],
  }
}
```

#### Basic Auth
Validates `Authorization: Basic <base64>` header.

```ts
// nitro.config.ts
runtimeConfig: {
  auth: {
    provider: "basic",
    basicAuth: {
      username: "admin",
      password: "password123"
    },
  }
}
```

#### Mock (Dev only)
Always allows the request. Useful for local development.

```ts
// nitro.config.ts
runtimeConfig: {
  auth: {
    provider: "mock",
  }
}
```

## TypeScript Support

You can import types directly from the package:

```ts
import type { AuthConfig, AuthAdapter } from "nitro-auth/types";
import { apiKeyAdapter, bearerAdapter } from "nitro-auth/adapters";
```

## License

MIT
