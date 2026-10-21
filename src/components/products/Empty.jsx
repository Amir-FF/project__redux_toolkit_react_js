import { NavLink } from "react-router";
import { ROUTES } from "../../constants/routes";

const Empty = () => (
  <>
    <div className="text-center space-y-5">
      <i className="bi bi-bag-x-fill text-8xl text-gray-800 transition hover:text-gray-800/85" />
      <h1 className="text-xl mt-2">Cart is Empty</h1>
      <NavLink
        className="cursor-pointer rounded-sm border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
        to={ROUTES.products}
        data-discover="true"
      >
        Products
      </NavLink>
    </div>
  </>
);

export default Empty;
