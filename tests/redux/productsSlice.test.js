import { describe, expect, it } from "vitest";
import reducer from "../../src/redux/productsSlice";

describe("productsSlice", () => {
  const state = reducer(undefined, { type: "@@INIT" });

  it("ships with 4 products", () => {
    expect(state.items).toHaveLength(4);
  });

  it("gives every product a unique id", () => {
    const ids = state.items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every product the required fields", () => {
    for (const item of state.items) {
      expect(item).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        image: expect.stringMatching(/^\/images\/product-\d+\.jpg$/),
        price: expect.any(Number),
      });
      expect(item.price).toBeGreaterThan(0);
    }
  });

  it("does not change state on unknown actions", () => {
    expect(reducer(state, { type: "unknown" })).toBe(state);
  });
});
