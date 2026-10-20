import { Link, NavLink } from "react-router";
import { ROUTES } from "../constants/routes";

const Header = () => (
  <>
    <header className="bg-gray-100/50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="font-bold text-2xl text-indigo-600" href="#">
          Logo
        </a>

        {/* Navbar */}
        <div className="w-full flex items-center justify-end md:justify-between gap-6">
          <nav>
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 transition hover:text-indigo-500/75"
                      : "text-gray-500 transition hover:text-gray-500/75"
                  }
                  to={ROUTES.home}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 transition hover:text-indigo-500/75"
                      : "text-gray-500 transition hover:text-gray-500/75"
                  }
                  to={ROUTES.products}
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-x-1">
            <div className="rounded-full bg-indigo-200 px-2.5 py-0.5 text-sm font-bold text-indigo-00">
              {/* {cartItems.length} */}
            </div>
            <Link to={ROUTES.cart}>
              <i className="bi bi-bag-fill cursor-pointer text-2xl text-gray-800 transition hover:text-gray-800/85"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  </>
);

export default Header;
