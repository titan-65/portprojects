import { describe, it, expect, vi } from "vitest";
import { apiKeyAdapter } from "../../src/adapters/api-key.js";

// Mock h3's getHeader
const mocks = vi.hoisted(() => ({
  getHeader: vi.fn(),
}));

vi.mock("h3", () => ({
  getHeader: mocks.getHeader,
}));

describe("apiKeyAdapter", () => {
  it("should fail if no API keys are configured", async () => {
    mocks.getHeader.mockReturnValue("some-key");
    const result = await apiKeyAdapter.authenticate({} as any, { apiKeys: [] });
    expect(result).toEqual({ ok: false, reason: "No API keys configured." });
  });

  it("should fail if API key does not match", async () => {
    mocks.getHeader.mockReturnValue("wrong-key");
    const result = await apiKeyAdapter.authenticate({} as any, { apiKeys: ["valid-key"] });
    expect(result).toEqual({ ok: false, reason: "Invalid API key." });
  });

  it("should succeed if API key matches", async () => {
    mocks.getHeader.mockReturnValue("valid-key");
    const result = await apiKeyAdapter.authenticate({} as any, { apiKeys: ["valid-key"] });
    expect(result.ok).toBe(true);
  });

  it("should handle missing header", async () => {
    mocks.getHeader.mockReturnValue(undefined);
    const result = await apiKeyAdapter.authenticate({} as any, { apiKeys: ["valid-key"] });
    expect(result.ok).toBe(false);
  });
});
