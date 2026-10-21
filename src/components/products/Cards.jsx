import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const Cards = () => {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container mx-auto mt-15 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.id} className="border-2 border-gray-200 rounded-sm">
              <img
                alt="error"
                className="aspect-square w-full rounded-sm object-cover"
                src={item.image}
              />

              <div className="my-3 px-4">
                <h3 className="font-bold text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  {item.name}
                </h3>

                <p className="mt-3">{item.description}</p>

                <div className="flex justify-between items-center mt-5">
                  <button
                    onClick={() => (
                      dispatch(addToCart(item)),
                      toast.success("Product Adeded")
                    )}
                    className="cursor-pointer rounded-sm border border-indigo-600 px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
                  >
                    Add to Cart
                  </button>

                  <p className="text-md font-bold text-gray-700">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
