import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  experimental: {
    database: true,
  },
  database: {
    default: {
      connector: "sqlite",
      options: { path: ":memory:" },
    },
  },
  plugins: ["../../packages/nitro-auth/src/index.ts"],
  serverDir: "server",
  runtimeConfig: {
    auth: {
      provider: "mock",
      bypassPaths: ["/api/seed"],
      apiKeys: [],
      bearerTokens: [],
      basicAuth: {
        username: "",
        password: "",
      },
    },
    public: {
      truckName: "BrewStop Coffee",
    },
  },
});
