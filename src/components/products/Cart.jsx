// import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { useMemo } from "react";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Product</th>
              <th className="px-3 py-2 whitespace-nowrap">Price</th>
              <th className="px-3 py-2 whitespace-nowrap">Quantity</th>
              <th className="px-3 py-2 whitespace-nowrap">Subtotal</th>
              <th className="px-3 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {cart.map((item) => (
              <tr key={item.id} className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex gap-x-4">
                    <img
                      alt="error"
                      className="aspect-square size-20 rounded-sm object-cover"
                      src={item.image}
                    />

                    <div>
                      <h1 className="font-bold">{item.name}</h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.price.toLocaleString()}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item))}
                      className="cursor-pointer rounded-sm border border-gray-700 bg-gray-700 px-2 py-0.25 text-lg font-medium text-white focus:ring-3 focus:outline-hidden"
                    >
                      -
                    </button>

                    <p>{item.quantity}</p>

                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="cursor-pointer rounded-sm border border-gray-700 bg-gray-700 px-2 py-0.25 text-lg font-medium text-white focus:ring-3 focus:outline-hidden"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {(item.price * item.quantity).toLocaleString()}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button
                    onClick={() => (
                      dispatch(removeFromCart(item)),
                      toast.warn("Cart Updated")
                    )}
                    className="cursor-pointer rounded-sm border border-red-600 bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <div className="mt-5 flex justify-between items-center">
          <button
            onClick={() => dispatch(clearCart())}
            className="cursor-pointer rounded-sm border border-gray-800 bg-gray-800 px-4 py-2 text-sm font-medium text-white focus:ring-3 focus:outline-hidden"
          >
            Clear Cart
          </button>
          <h1 className="text-xl font-bold">
            Total: {totalPrice.toLocaleString()}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Cart;
