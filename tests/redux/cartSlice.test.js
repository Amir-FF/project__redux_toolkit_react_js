import { describe, expect, it } from "vitest";
import reducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../../src/redux/cartSlice";
import { productA, productB } from "../test-utils";

const stateWith = (...cart) => ({ cart });

describe("cartSlice", () => {
  it("has an empty cart as initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({ cart: [] });
  });

  describe("addToCart", () => {
    it("adds a new product with quantity 1", () => {
      const state = reducer(undefined, addToCart(productA));

      expect(state.cart).toHaveLength(1);
      expect(state.cart[0]).toEqual({ ...productA, quantity: 1 });
    });

    it("increments quantity when the product already exists", () => {
      let state = reducer(undefined, addToCart(productA));
      state = reducer(state, addToCart(productA));
      state = reducer(state, addToCart(productA));

      expect(state.cart).toHaveLength(1);
      expect(state.cart[0].quantity).toBe(3);
    });

    it("keeps different products as separate lines", () => {
      let state = reducer(undefined, addToCart(productA));
      state = reducer(state, addToCart(productB));

      expect(state.cart.map((i) => i.id)).toEqual([productA.id, productB.id]);
    });
  });

  describe("decreaseQuantity", () => {
    it("decreases quantity by one", () => {
      const state = reducer(
        stateWith({ ...productA, quantity: 3 }),
        decreaseQuantity(productA),
      );

      expect(state.cart[0].quantity).toBe(2);
    });

    it("removes the product when quantity reaches 0", () => {
      const state = reducer(
        stateWith({ ...productA, quantity: 1 }, { ...productB, quantity: 2 }),
        decreaseQuantity(productA),
      );

      expect(state.cart).toHaveLength(1);
      expect(state.cart[0].id).toBe(productB.id);
    });

    it("does nothing for a product that is not in the cart", () => {
      const initial = stateWith({ ...productA, quantity: 2 });
      const state = reducer(initial, decreaseQuantity(productB));

      expect(state).toEqual(initial);
    });
  });

  describe("removeFromCart", () => {
    it("removes the whole line regardless of quantity", () => {
      const state = reducer(
        stateWith({ ...productA, quantity: 5 }, { ...productB, quantity: 1 }),
        removeFromCart(productA),
      );

      expect(state.cart).toEqual([{ ...productB, quantity: 1 }]);
    });

    it("does nothing for an unknown product", () => {
      const initial = stateWith({ ...productA, quantity: 1 });
      const state = reducer(initial, removeFromCart(productB));

      expect(state).toEqual(initial);
    });
  });

  describe("clearCart", () => {
    it("empties the cart", () => {
      const state = reducer(
        stateWith({ ...productA, quantity: 2 }, { ...productB, quantity: 1 }),
        clearCart(),
      );

      expect(state.cart).toEqual([]);
    });
  });
});
