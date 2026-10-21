import { useSelector } from "react-redux";
import Cart from "../components/products/Cart";
import Empty from "../components/products/Empty";

const TotalPage = () => {
  const { cart } = useSelector((state) => state.cart);

  return <>{cart.length ? <Cart /> : <Empty />}</>;
};

export default TotalPage;
