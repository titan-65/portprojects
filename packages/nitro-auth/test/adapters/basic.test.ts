import { describe, it, expect, vi } from "vitest";
import { Buffer } from "node:buffer";
import { basicAdapter } from "../../src/adapters/basic.js";

const mocks = vi.hoisted(() => ({
  getHeader: vi.fn(),
}));

vi.mock("h3", () => ({
  getHeader: mocks.getHeader,
}));

describe("basicAdapter", () => {
  it("should fail if header is missing", async () => {
    mocks.getHeader.mockReturnValue(undefined);
    const result = await basicAdapter.authenticate({} as any, {});
    expect(result).toEqual({ ok: false, reason: "Missing basic auth header." });
  });

  it("should fail if header format is invalid", async () => {
    mocks.getHeader.mockReturnValue("invalid-format");
    const result = await basicAdapter.authenticate({} as any, {});
    expect(result).toEqual({ ok: false, reason: "Missing basic auth header." });
  });

  it("should fail if credentials are not configured", async () => {
    const creds = Buffer.from("user:pass").toString("base64");
    mocks.getHeader.mockReturnValue(`Basic ${creds}`);
    const result = await basicAdapter.authenticate({} as any, { basicAuth: undefined });
    expect(result).toEqual({ ok: false, reason: "No basic auth credentials configured." });
  });

  it("should fail if credentials do not match", async () => {
    const creds = Buffer.from("user:wrongpass").toString("base64");
    mocks.getHeader.mockReturnValue(`Basic ${creds}`);
    const result = await basicAdapter.authenticate({} as any, { 
      basicAuth: { username: "user", password: "pass" } 
    });
    expect(result.ok).toBe(false);
  });

  it("should succeed if credentials match", async () => {
    const creds = Buffer.from("user:pass").toString("base64");
    mocks.getHeader.mockReturnValue(`Basic ${creds}`);
    const result = await basicAdapter.authenticate({} as any, { 
      basicAuth: { username: "user", password: "pass" } 
    });
    expect(result.ok).toBe(true);
  });
});
