import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromFavourite } from "../Redux/appSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";

const FavouriteProducts = () => {
  const favouriteProducts = useSelector((state) => state.app.favouriteProducts);
  const checkAdded = useSelector((state) => state.app.checkAdded);
  const dispatch = useDispatch();
  if (favouriteProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No select favourites</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold bg-red my-5">
        Your Favourite Products
      </h1>
      <div className="grid grid-cols-1  lgl:grid-cols-2 xl:grid-cols-3 gap-6">
        {favouriteProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-lg flex flex-col  hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]  items-center gap-6">
            <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.id}
                  className="lg:w-[45%] md:w-[55%] w-[70%] h-auto object-contain"
                />
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  <h2 className="text-lg tracking-tight font-semibold">
                    {product.title}
                  </h2>
                  <p className="text-xs font-medium text-[#49498f] bg-[#E2E3FFFF] p-1 rounded-xl text-center">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm tracking-tight w-[70%] lgl:w-full">
                {product.description.length > 120
                ? `${product.description.slice(0, 400)}...`
                : product.description}
                </p>
                {/* <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < Math.round(item.rating.rate)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-700 text-sm mb-2">
                    {`(${item.rating.rate})`}
                  </span>
                  <p className="ml-4">{item.rating.count}</p>
                </div> */}
              </div>
            </div>
            <div className="flex justify-between items-center my-1">
              <p className="text-lg font-semibold">
                ${parseFloat(product.price).toFixed(2)}
              </p>
             <div className="flex gap-2">
             <button
                  id={`added${product.id}`}
                  className={`flex gap-3 items-center bg-[#5141E4FF] text-white px-4 py-2 rounded-2xl hover:bg-[#E2E3FFFF] hover:text-[#5141E4FF] hover:shadow-2xl hover:font-semibold transition duration-500 ${
                    checkAdded.includes(`added${product.id}`)
                      ? "opacity-70 hover:bg-[#5141e4]  hover:text-white transition duration-500"
                      : "hover:bg-[#5141E4FF]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.target.disabled = true;
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        rating: product.rating,
                        totalPrice: product.price,
                        quantity: 1,
                        idAdded: e.target.id,
                      })
                    );
                  }}
                >
                  {checkAdded.includes(`added${product.id}`) ? (
                    <>
                      Added <MdBookmarkAdded />
                    </>
                  ) : (
                    <>
                      Add{" "}
                      <FaShoppingCart
                        onClick={(e) => {
                          e.stopPropagation();
                          const button = document.getElementById(
                            `added${product.id}`
                          );
                          button.disabled = true;
                          dispatch(
                            addToCart({
                              id: product.id,
                              title: product.title,
                              image: product.image,
                              price: product.price,
                              description: product.description,
                              category: product.category,
                              rating: product.rating,
                              totalPrice: product.price,
                              quantity: 1,
                              idAdded: `added${product.id}`,
                            })
                          );
                        }}
                      />
                    </>
                  )}
                </button>
              <button
                className="bg-red text-[#5141E4FF] font-semibold px-4 py-2 rounded-xl hover:bg-[#5141E4FF] hover:text-[#fff] hover:px-4 hover:py-2 transition duration-500"
                onClick={() => {
                  dispatch(removeFromFavourite({ id: product.id, idIcon:`heart${product.id}` }));
                }}
              >
                Remove
              </button>
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteProducts;
