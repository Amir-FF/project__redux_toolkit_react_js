import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Empty from "../../src/components/products/Empty";
import { renderWithProviders } from "../test-utils";

describe("<Empty />", () => {
  it("tells the user the cart is empty", () => {
    renderWithProviders(<Empty />);
    expect(screen.getByText("Cart is Empty")).toBeInTheDocument();
  });

  it("links back to the products page", () => {
    renderWithProviders(<Empty />);
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
