import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import cartReducer from "../src/redux/cartSlice";
import productsReducer from "../src/redux/productsSlice";

// Fixtures
export const productA = {
  id: 101,
  name: "Test Product A",
  description: "Description A",
  image: "/images/a.jpg",
  price: 100,
};

export const productB = {
  id: 102,
  name: "Test Product B",
  description: "Description B",
  image: "/images/b.jpg",
  price: 50,
};

// A fresh store per test (does NOT touch localStorage, unlike src/redux/store.js)
export function createTestStore(cart = []) {
  return configureStore({
    reducer: { products: productsReducer, cart: cartReducer },
    preloadedState: { cart: { cart } },
  });
}

// Render with Redux Provider + MemoryRouter
export function renderWithProviders(
  ui,
  { cart = [], route = "/", store = createTestStore(cart) } = {},
) {
  const result = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );

  return { store, ...result };
}
