# Shopping Cart App — Redux Toolkit + React + tailwindcss + vitest + vite

A small e-commerce demo built to practice **Redux Toolkit** with **React 19**. Users can browse a product list, add items to a cart, change quantities, remove items, and see the total price. The cart is persisted in `localStorage`, so it survives a page refresh.

## Features

- Product listing page with 4 sample products
- Add to cart (adding the same product again increases its quantity)
- Cart page with:
  - quantity controls (`+` / `-`; reaching 0 removes the item)
  - per-item subtotal and overall total
  - delete a single item / clear the whole cart
- Cart badge in the header
- Toast notifications (`react-toastify`)
- Empty-cart screen with a link back to the products
- 404 page for unknown routes
- Cart persisted to `localStorage` (with safe fallback if the saved data is corrupted)

## Tech Stack

| Area          | Library                                                     |
| ------------- | ----------------------------------------------------------- |
| UI            | React 19                                                    |
| State         | Redux Toolkit 2 + React-Redux 9                             |
| Routing       | React Router 8 (`react-router`)                             |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`), Sass, Bootstrap Icons |
| Notifications | react-toastify                                              |
| Build tool    | Vite 8                                                      |
| Testing       | Vitest, React Testing Library, jest-dom, user-event, jsdom  |
| Linting       | ESLint 10 (+ react-hooks, react-refresh)                    |

## Getting Started

**Requirements:** Node.js 20+ and npm.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Vite dev server with HMR   |
| `npm run build`    | Create a production build in `dist/` |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm test`         | Run Vitest in watch mode             |
| `npm run test:run` | Run all tests once (CI-friendly)     |

## Routes

| Path        | Page           | Description                                         |
| ----------- | -------------- | --------------------------------------------------- |
| `/`         | `HomePage`     | Welcome page                                        |
| `/products` | `ProductsPage` | Product cards with "Add to Cart"                    |
| `/total`    | `TotalPage`    | Cart table + total (or the empty state if no items) |
| `*`         | `NotFoundPage` | 404                                                 |

All pages are rendered inside `MainLayout` (header + `<Outlet />`).

## Project Structure

```text
.
├── public/images/            # product images
├── src/
│   ├── components/
│   │   ├── common/           # PageTitle
│   │   └── products/         # Cards, Cart, Empty
│   ├── constants/            # routes.js, text.js
│   ├── layouts/              # Header, MainLayout
│   ├── pages/                # HomePage, ProductsPage, TotalPage, NotFoundPage
│   ├── redux/                # store.js, cartSlice.js, productsSlice.js
│   ├── styles/               # main.css (Tailwind), main.scss (Bootstrap Icons)
│   ├── utils/                # generateId.js
│   ├── App.jsx               # router setup
│   └── main.jsx              # entry point (Provider + StrictMode)
├── tests/
│   ├── setup.js              # jest-dom matchers + cleanup after each test
│   ├── test-utils.jsx        # renderWithProviders, createTestStore, fixtures
│   ├── App.test.jsx
│   ├── components/           # Cards, Cart, Empty tests
│   ├── layouts/              # Header tests
│   ├── pages/                # TotalPage tests
│   ├── redux/                # cartSlice, productsSlice, store tests
│   └── utils/                # generateId tests
└── vite.config.js            # Vite + Vitest configuration
```

## State Management

The store (`src/redux/store.js`) has two slices:

**`products`** — static list of products (`items`). Each product: `{ id, name, description, image, price }`. IDs come from `generateId()`.

**`cart`** — `{ cart: [{ ...product, quantity }] }`

| Action             | Payload | Behavior                                                  |
| ------------------ | ------- | --------------------------------------------------------- |
| `addToCart`        | product | Adds with `quantity: 1`, or increments if already present |
| `decreaseQuantity` | product | Decrements; removes the item when quantity hits 0         |
| `removeFromCart`   | product | Removes the item entirely                                 |
| `clearCart`        | —       | Empties the cart                                          |

**Persistence:** on startup the store loads `cart` from `localStorage` (falls back to `[]` on missing/invalid data) and `store.subscribe` saves the cart after every state change.

## Testing

Tests use **Vitest** with the **jsdom** environment and **React Testing Library**. The configuration lives in the `test` block of `vite.config.js`:

- `globals: true` — `describe`/`it`/`expect` available without imports
- `environment: "jsdom"`
- `include: ["tests/**/*.test.{js,jsx}"]`
- `setupFiles: "./tests/setup.js"` — registers jest-dom matchers, unmounts components and clears `localStorage` after each test

```bash
npm test            # watch mode
npm run test:run    # single run
```

What is covered:

| File                          | What it tests                                                               |
| ----------------------------- | --------------------------------------------------------------------------- |
| `redux/cartSlice.test.js`     | add / increment / decrease / remove / clear reducers, edge cases            |
| `redux/productsSlice.test.js` | initial products, unique IDs, required fields                               |
| `redux/store.test.js`         | `localStorage` load, corrupted data fallback, save on dispatch, save errors |
| `utils/generateId.test.js`    | incrementing, unique IDs                                                    |
| `components/Cards.test.jsx`   | product rendering, add-to-cart, toast                                       |
| `components/Cart.test.jsx`    | rows, subtotals, total, `+` / `-` / delete / clear                          |
| `components/Empty.test.jsx`   | empty message and link                                                      |
| `layouts/Header.test.jsx`     | nav links, cart badge, active link style                                    |
| `pages/TotalPage.test.jsx`    | empty state vs. cart table                                                  |
| `App.test.jsx`                | routing, 404, navigation, full add-to-cart flow                             |

Helpers in `tests/test-utils.jsx`:

- `createTestStore(cart)` — a fresh store per test that does **not** touch `localStorage`
- `renderWithProviders(ui, { cart, route })` — renders with Redux `Provider` + `MemoryRouter` and returns the store so you can assert on state

`react-toastify` is mocked in component tests so no real toasts are rendered.

## Known Notes

- The header badge shows the number of **distinct products** in the cart (`cart.length`), not the sum of quantities.
- Prices are displayed as plain numbers without a currency symbol.
- Product descriptions and the home page text are placeholder Lorem Ipsum.
