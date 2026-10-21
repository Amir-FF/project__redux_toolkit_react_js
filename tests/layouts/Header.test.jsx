import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Header from "../../src/layouts/Header";
import { productA, productB, renderWithProviders } from "../test-utils";

describe("<Header />", () => {
  it("renders navigation links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("has a cart link pointing to /total", () => {
    renderWithProviders(<Header />);

    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/total");
  });

  it("shows 0 when the cart is empty", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("shows the number of cart lines", () => {
    renderWithProviders(<Header />, {
      cart: [
        { ...productA, quantity: 3 },
        { ...productB, quantity: 1 },
      ],
    });

    // Header counts distinct products (cart.length), not total quantity
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("highlights the active link", () => {
    renderWithProviders(<Header />, { route: "/products" });

    expect(screen.getByRole("link", { name: "Products" })).toHaveClass(
      "text-indigo-500",
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "text-gray-500",
    );
  });
});
