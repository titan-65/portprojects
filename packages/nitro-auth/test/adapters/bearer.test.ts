import { describe, it, expect, vi } from "vitest";
import { bearerAdapter } from "../../src/adapters/bearer.js";

const mocks = vi.hoisted(() => ({
  getHeader: vi.fn(),
}));

vi.mock("h3", () => ({
  getHeader: mocks.getHeader,
}));

describe("bearerAdapter", () => {
  it("should fail if no tokens are configured", async () => {
    mocks.getHeader.mockReturnValue("Bearer token123");
    const result = await bearerAdapter.authenticate({} as any, { bearerTokens: [] });
    expect(result).toEqual({ ok: false, reason: "No bearer tokens configured." });
  });

  it("should fail if header is missing or invalid format", async () => {
    mocks.getHeader.mockReturnValue("token123"); // Missing "Bearer " prefix
    const result = await bearerAdapter.authenticate({} as any, { bearerTokens: ["token123"] });
    expect(result.ok).toBe(false);
  });

  it("should fail if token does not match", async () => {
    mocks.getHeader.mockReturnValue("Bearer wrong-token");
    const result = await bearerAdapter.authenticate({} as any, { bearerTokens: ["valid-token"] });
    expect(result.ok).toBe(false);
  });

  it("should succeed if token matches", async () => {
    mocks.getHeader.mockReturnValue("Bearer valid-token");
    const result = await bearerAdapter.authenticate({} as any, { bearerTokens: ["valid-token"] });
    expect(result.ok).toBe(true);
  });
});
