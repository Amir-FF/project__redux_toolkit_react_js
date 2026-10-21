import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import Cart from "../../src/components/products/Cart";
import { productA, productB, renderWithProviders } from "../test-utils";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), warn: vi.fn() },
}));

// A: 100 x 2 = 200, B: 50 x 1 = 50  ->  total 250
const cart = [
  { ...productA, quantity: 2 },
  { ...productB, quantity: 1 },
];

const rowOf = (name) => screen.getByText(name).closest("tr");

describe("<Cart />", () => {
  it("renders a row for every cart item", () => {
    renderWithProviders(<Cart />, { cart });

    expect(screen.getByText("Test Product A")).toBeInTheDocument();
    expect(screen.getByText("Test Product B")).toBeInTheDocument();
  });

  it("shows quantity and subtotal per row", () => {
    renderWithProviders(<Cart />, { cart });

    const row = within(rowOf("Test Product A"));
    expect(row.getByText("2")).toBeInTheDocument(); // quantity
    expect(row.getByText("200")).toBeInTheDocument(); // subtotal
  });

  it("calculates the total price", () => {
    renderWithProviders(<Cart />, { cart });

    expect(screen.getByText(/^Total:/)).toHaveTextContent("Total: 250");
  });

  it("increases quantity with the + button", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cart />, { cart });

    await user.click(
      within(rowOf("Test Product A")).getByRole("button", { name: "+" }),
    );

    expect(store.getState().cart.cart[0].quantity).toBe(3);
    expect(screen.getByText(/^Total:/)).toHaveTextContent("Total: 350");
  });

  it("decreases quantity with the - button", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cart />, { cart });

    await user.click(
      within(rowOf("Test Product A")).getByRole("button", { name: "-" }),
    );

    expect(store.getState().cart.cart[0].quantity).toBe(1);
  });

  it("removes an item when its quantity drops to 0", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cart />, { cart });

    await user.click(
      within(rowOf("Test Product B")).getByRole("button", { name: "-" }),
    );

    expect(store.getState().cart.cart.map((i) => i.id)).toEqual([productA.id]);
  });

  it("deletes an item and shows a toast", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cart />, { cart });

    await user.click(
      within(rowOf("Test Product A")).getByRole("button", { name: "Delete" }),
    );

    expect(store.getState().cart.cart.map((i) => i.id)).toEqual([productB.id]);
    expect(toast.warn).toHaveBeenCalledTimes(1);
  });

  it("clears the whole cart", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cart />, { cart });

    await user.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(store.getState().cart.cart).toEqual([]);
  });
});
