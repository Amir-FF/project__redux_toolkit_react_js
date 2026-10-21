import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import App from "../src/App";
import { createTestStore } from "./test-utils";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), warn: vi.fn() },
  ToastContainer: () => null,
}));

// App uses BrowserRouter, so we set the URL through the History API.
function renderApp(path = "/", store = createTestStore()) {
  window.history.pushState({}, "", path);
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  return store;
}

describe("<App /> routing", () => {
  it("renders the home page on /", () => {
    renderApp("/");
    expect(
      screen.getByRole("heading", { name: "Shopping Cart App" }),
    ).toBeInTheDocument();
  });

  it("renders the products page on /products", () => {
    renderApp("/products");
    expect(screen.getByText("Xiaomi Mi Band 5")).toBeInTheDocument();
  });

  it("renders the empty cart on /total", () => {
    renderApp("/total");
    expect(screen.getByText("Cart is Empty")).toBeInTheDocument();
  });

  it("renders the 404 page for unknown routes", () => {
    renderApp("/does-not-exist");
    expect(screen.getByText("Not Found: error 404")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Home" }),
    ).toBeInTheDocument();
  });

  it("navigates from home to products via the header", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: "Products" }));

    expect(screen.getByText("Xiaomi Mi Band 5")).toBeInTheDocument();
  });

  it("full flow: add a product, then see it in the cart", async () => {
    const user = userEvent.setup();
    renderApp("/products");

    await user.click(screen.getAllByRole("button", { name: "Add to Cart" })[0]);

    // header badge updates
    expect(screen.getByText("1")).toBeInTheDocument();

    // go to the cart page via the bag icon link
    const cartLink = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href") === "/total");
    await user.click(cartLink);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/^Total:/)).toHaveTextContent("Total: 199");
  });
});
