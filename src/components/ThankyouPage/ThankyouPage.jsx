import React from "react";
import { Link } from "react-router-dom";

export const ThankyouPage = () => {
  return (
    // <!-- Thank You Page -->
    <div className="h-screen flex items-center w-11/12 m-auto">
      <div className="bg-gradient-to-b from-gray-100 to-white -mt-40">
        <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white border border-gray-200 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Thank You for chosen us!</h1>
          <p className="text-lg mb-6">
            We're thrilled that you've chosen to shop with us. Your support
            means the world to us!
          </p>
          <p className="text-lg mb-6">
            Your order has been successfully processed, and you will receive an
            email with your order details shortly in 24.Hr.
          </p>
          <p className="text-lg mb-6">
            If you have any questions or concerns, please don't hesitate to
            reach out to us at{" "}
            <a
              href="mailto:siddarth8k5@gmail.com"
              className="text-blue-600 hover:text-blue-800"
            >
              siddarth8k5@gmail.com
            </a>
            .
          </p>
          <Link to={"/"}>
            <a
              className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
              href="#"
            >
              <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                Get Your Favorite book
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
