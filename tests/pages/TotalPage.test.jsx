import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import TotalPage from "../../src/pages/TotalPage";
import { productA, renderWithProviders } from "../test-utils";

describe("<TotalPage />", () => {
  it("shows the empty state when the cart has no items", () => {
    renderWithProviders(<TotalPage />);

    expect(screen.getByText("Cart is Empty")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("shows the cart table when there are items", () => {
    renderWithProviders(<TotalPage />, {
      cart: [{ ...productA, quantity: 1 }],
    });

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByText("Cart is Empty")).not.toBeInTheDocument();
  });
});
