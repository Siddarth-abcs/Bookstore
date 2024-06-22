import axios from "axios";
import React, { useState, useEffect } from "react";

export const Products = ({ Cart }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [hindi, setHindi] = useState(true); // Add an error state

  useEffect(() => {
    axios
      .get("https://bookapi-seven.vercel.app/products")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-4xl h-[72vh] flex justify-center items-center">
          Loading...
        </p> // Show loading text or spinner while data is being fetched
      ) : (
        <div>
          <div className="w-5/6 mx-auto my-8 p-4 border-8 border-hero rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h1 className="text-2xl font-bold text-center text-hero-text">
              Books Available in tow languages
            </h1>

            <div className="my-3 flex flex-row items-center justify-center">
              <div className="flex flex-col w-3/6">
                <button className="bg-[rgba(54,219,203,1)] text-[rgba(0,0,0,1)] my-1 font-semibold py-2 px-4 rounded-[5px] hover:text-white hover:bg-hero-text">
                  Hindi Books
                </button>
                <button className="bg-[rgba(54,219,203,1)] text-[rgba(0,0,0,1)] my-1 font-semibold py-2 px-4 rounded-[5px] hover:text-white hover:bg-hero-text">
                  English Books
                </button>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold text-orange-800">
                  Special Offer
                </h2>
                <p className="text-md text-gray-600 font-semibold">
                  Order above ₹799 & get <br /> Free Delivery!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 md:gap-y-10 mx-8 mb-8">
            {data.map((product, index) => (
              <div
                key={index}
                className="group relative block overflow-hidden shadow-md"
              >
                <img
                  src={product.url}
                  alt={product.name}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-80"
                />
                <div className="relative border border-gray-100 bg-white p-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-gray-700">
                    <span className="line-through mr-2">₹{product.price}</span>₹
                    {product.discountprice}
                  </p>
                  <button
                    onClick={() => Cart(product)}
                    className="mt-2 block w-full rounded bg-yellow-400 p-2 text-md font-medium transition hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
