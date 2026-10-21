import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },

  preloadedState: {
    cart: {
      cart: loadCart(),
    },
  },
});

store.subscribe(() => {
  try {
    const items = store.getState().cart.cart;

    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Saving cart failed:", error);
  }
});
