import { describe, it, expect } from "vitest";
import { mockAdapter } from "../../src/adapters/mock.js";

describe("mockAdapter", () => {
  it("should always succeed", async () => {
    const result = await mockAdapter.authenticate({} as any, {});
    expect(result).toEqual({ ok: true });
  });
});
