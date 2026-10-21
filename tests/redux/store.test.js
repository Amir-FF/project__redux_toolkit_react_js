import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { productA } from "../test-utils";

const cartItem = { ...productA, quantity: 2 };

// store.js reads localStorage at import time, so every test re-imports it.
async function loadStore() {
  vi.resetModules();
  const { store } = await import("../../src/redux/store");
  const { addToCart, clearCart } = await import("../../src/redux/cartSlice");
  return { store, addToCart, clearCart };
}

describe("store", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("registers the products and cart reducers", async () => {
    const { store } = await loadStore();
    expect(Object.keys(store.getState()).sort()).toEqual(["cart", "products"]);
  });

  it("starts with an empty cart when localStorage is empty", async () => {
    const { store } = await loadStore();
    expect(store.getState().cart.cart).toEqual([]);
  });

  it("restores the cart from localStorage", async () => {
    localStorage.setItem("cart", JSON.stringify([cartItem]));

    const { store } = await loadStore();
    expect(store.getState().cart.cart).toEqual([cartItem]);
  });

  it("falls back to an empty cart when the saved JSON is corrupted", async () => {
    localStorage.setItem("cart", "{not valid json");

    const { store } = await loadStore();
    expect(store.getState().cart.cart).toEqual([]);
  });

  it("saves the cart to localStorage after every dispatch", async () => {
    const { store, addToCart, clearCart } = await loadStore();

    store.dispatch(addToCart(productA));
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([
      { ...productA, quantity: 1 },
    ]);

    store.dispatch(clearCart());
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([]);
  });

  it("logs an error (and does not crash) when saving fails", async () => {
    const { store, addToCart } = await loadStore();
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    expect(() => store.dispatch(addToCart(productA))).not.toThrow();
    expect(errorSpy).toHaveBeenCalledWith(
      "Saving cart failed:",
      expect.any(Error),
    );
  });
});
