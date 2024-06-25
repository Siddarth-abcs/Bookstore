import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const Productpage = ({ Cartpage }) => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div>
      <div className="w-11/12 m-auto">
        <div className="container mx-auto mt-10">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2">
              <img
                src={product.url}
                alt={product.name}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-6">
                <span className="text-gray-500 font-semibold text-2xl line-through">
                  ₹{product.discountprice}.00
                </span>
                <span className="ml-2 text-2xl font-semibold text-red-600">
                  ₹{product.price}.00
                </span>
              </div>
              <p className="text-gray-800 mb-6 text-md font-semibold">
                {product.description}
              </p>

              <div className="flex flex-col gap-4">
                <div className="w-5/6 h-2 bg-black"></div>
                <div className="flex gap-4 my-4">
                  <button
                    onClick={() => Cartpage(product)}
                    className="bg-blue-600 w-full hover:bg-blue-900 text-white text-xl font-bold py-3 px-4 rounded"
                  >
                    ADD TO CART
                  </button>
                </div>
                <a
                  href="https://api.whatsapp.com/send/?phone=919211868931&text&type=phone_number&app_absent=0"
                  className="bg-green-500 hover:bg-green-800 text-white font-bold py-1 w-3/4 px-4 rounded flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="#ffffff"
                    className="h-6 w-6"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  Need Help? Whatsapp Us.
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-12 mx-auto p-4">
          <h1 className="text-2xl text-center font-bold mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <div className="text-global-accent text-center p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">
              IS THIS WEBSITE LEGIT?
            </h2>
            <p className="text-gray-700">
              Don't Worry About Anything. Our Website Is Fully Legitimate. And
              We Follow All The Guidelines Of Government.
            </p>
          </div>
          <div className="text-global-accent text-center p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">
              HOW CAN WE TRUST THAT THIS IS NOT A SCAM?
            </h2>
            <p className="text-gray-700">
              We Understand The Concern SO That We Have Intoduced The Cash On
              Delivery Option So That Customer Can Order Safely
            </p>
          </div>
          <div className="text-global-accent text-center p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">
              CAN WE MAKE ONLINE PAYMENT?
            </h2>
            <p className="text-gray-700">
              Ye Sure, We Are Registered With The Government And Payment Gateway
              Has Verified Our Docs So Online Payment Can Be Made.
            </p>
          </div>
          <div className="text-global-accent text-center p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">
              ARE THESE BOOKS OR PHOTOCOPIES ?
            </h2>
            <p className="text-gray-700">
              All Books Are New & we dont sell photocopies..Please Visit our
              insta profile and check the Quality with images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
