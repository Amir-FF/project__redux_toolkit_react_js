import { beforeEach, describe, expect, it, vi } from "vitest";

describe("generateId", () => {
  beforeEach(() => {
    vi.resetModules(); // reset the module-level counter
  });

  it("starts from 1", async () => {
    const { generateId } = await import("../../src/utils/generateId");
    expect(generateId()).toBe(1);
  });

  it("increments on every call", async () => {
    const { generateId } = await import("../../src/utils/generateId");
    expect([generateId(), generateId(), generateId()]).toEqual([1, 2, 3]);
  });

  it("never returns duplicates", async () => {
    const { generateId } = await import("../../src/utils/generateId");
    const ids = Array.from({ length: 50 }, () => generateId());
    expect(new Set(ids).size).toBe(50);
  });
});
