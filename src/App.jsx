import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./constants/routes";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.products} element={<ProductsPage />} />
            <Route path={ROUTES.cart} element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        <ToastContainer position="top-center" closeOnClick={false} draggable />
      </BrowserRouter>
    </>
  );
}

export default App;
