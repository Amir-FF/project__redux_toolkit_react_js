import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import Cards from "../../src/components/products/Cards";
import { renderWithProviders } from "../test-utils";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), warn: vi.fn() },
}));

describe("<Cards />", () => {
  it("renders all products from the store", () => {
    renderWithProviders(<Cards />);

    expect(screen.getByText("Xiaomi Mi Band 5")).toBeInTheDocument();
    expect(screen.getByText("Big Power Sound Speaker")).toBeInTheDocument();
    expect(screen.getByText("WiFi Security Camera")).toBeInTheDocument();
    expect(screen.getByText("PX7 Wireless Headphones")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Add to Cart" })).toHaveLength(
      4,
    );
  });

  it("shows the price and image of each product", () => {
    renderWithProviders(<Cards />);

    expect(screen.getByText("199")).toBeInTheDocument();
    expect(screen.getAllByRole("img")[0]).toHaveAttribute(
      "src",
      "/images/product-1.jpg",
    );
  });

  it("adds a product to the cart and shows a toast", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cards />);

    await user.click(screen.getAllByRole("button", { name: "Add to Cart" })[0]);

    const { cart } = store.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0]).toMatchObject({ name: "Xiaomi Mi Band 5", quantity: 1 });
    expect(toast.success).toHaveBeenCalledTimes(1);
  });

  it("increments the quantity when the same product is added twice", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Cards />);
    const button = screen.getAllByRole("button", { name: "Add to Cart" })[0];

    await user.click(button);
    await user.click(button);

    const { cart } = store.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(2);
  });
});
