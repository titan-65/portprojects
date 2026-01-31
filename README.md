# PortProjects Monorepo

A Turborepo-based monorepo containing full-stack applications and reusable packages.

## Apps and Packages

### Apps

- **`brewstop-api`**: A [Nitro](https://nitro.unjs.io/) backend API serving food truck data with SQLite database and authentication via `nitro-auth`.
- **`brewstop-web`**: A [Nuxt 3](https://nuxt.com/) frontend application consuming the API.

### Packages

- **`nitro-auth`**: A lightweight authentication plugin for Nitro with pluggable adapters (API Key, Bearer Token, Basic Auth, Mock). Published to npm.
- **`@repo/typescript-config`**: Shared TypeScript configurations used throughout the monorepo.

## What's Inside?

This monorepo is built with:

- [Turborepo](https://turbo.build/repo) for build orchestration and caching
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [pnpm](https://pnpm.io/) for fast, disk space efficient package management

### Technologies

| Category | Technology |
|----------|------------|
| Backend Framework | Nitro (powered by H3) |
| Frontend Framework | Nuxt 3 (Vue 3) |
| Database | SQLite (better-sqlite3) |
| ORM | Drizzle ORM |
| Testing | Vitest |
| Auth | nitro-auth (custom package) |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Build everything
pnpm build

# Run tests
pnpm test
```

## Package Details

### nitro-auth

A lightweight, zero-dependency authentication middleware for Nitro and H3.

- **npm**: `npm install nitro-auth`
- **Features**: API Key, Bearer Token, Basic Auth, Mock adapters
- **Location**: `/packages/nitro-auth`
- **README**: [packages/nitro-auth/README.md](packages/nitro-auth/README.md)

### brewstop-api

Backend API for the BrewStop food truck finder application.

- **Port**: 4000
- **Features**: REST API, SQLite database, authentication middleware
- **Location**: `/apps/brewstop-api`

### brewstop-web

Frontend Nuxt 3 application for discovering food trucks.

- **Port**: 3000
- **Features**: SSR, API integration, modern UI
- **Location**: `/apps/brewstop-web`

## Build

```bash
# With global turbo installed (recommended)
turbo build

# Or with pnpm
pnpm build
```

## Development

```bash
# Start all apps
pnpm dev

# Start specific app
cd apps/brewstop-api && pnpm dev
```

## License

MIT
