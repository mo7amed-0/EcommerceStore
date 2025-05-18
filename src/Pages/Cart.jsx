import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, removeFromCart } from "../Redux/appSlice";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.app.products);
  const navigate = useNavigate();
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="md:min-h-[60vh] mx-auto">
      <h1 className="text-4xl font-bold bg-red my-5">Your Cart</h1>
      <div className="grid grid-cols-1  lgl:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-lg flex flex-col  hover:scale-105 transition-transform duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]  items-center gap-6">
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.id}
                  className="lg:w-[50%] md:w-[100%] w-[70%] "
                />
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  <h2 className="text-lg tracking-tight font-semibold">
                    {product.title.length > 80
                      ? `${product.title.slice(0, 80)}...`
                      : product.title}
                  </h2>
                  <p className="text-xs font-medium text-[#49498f] bg-[#E2E3FFFF] p-1 rounded-xl text-center">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm tracking-tight">
                  {product.description.length > 120
                    ? `${product.description.slice(0, 300)}...`
                    : product.description}{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center my-1">
              <p className="text-lg font-semibold">
                ${parseFloat(product.totalPrice).toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 rounded-lg bg-[#5141E4FF] text-white hover:bg-[#E2E3FFFF] hover:text-[#5141E4FF] hover:shadow-2xl hover:font-bold transition duration-500"
                  onClick={() => {
                    dispatch(increment({ id: product.id }));
                  }}
                >
                  +
                </button>
                {product.quantity}
                <button
                  className="px-2 py-1 rounded-lg bg-[#5141E4FF] text-white hover:bg-[#E2E3FFFF] hover:text-[#5141E4FF] hover:shadow-2xl hover:font-bold transition duration-500"
                  onClick={() => {
                    dispatch(
                      decrement({
                        id: product.id,
                        idAdded: `added${product.id}`,
                      })
                    );
                  }}
                >
                  -
                </button>
              </div>
              <button
                className="bg-red text-[#5141E4FF] font-semibold px-4 py-2 rounded hover:bg-[#5141E4FF] hover:text-[#fff] hover:px-4 hover:py-2 transition duration-500"
                onClick={() => {
                  dispatch(
                    removeFromCart({
                      id: product.id,
                      idAdded: `added${product.id}`,
                    })
                  );
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            alert("Opss we don't sell anything 😊");
            navigate("/");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
