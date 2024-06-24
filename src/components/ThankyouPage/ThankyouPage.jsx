import React from "react";
import { Link } from "react-router-dom";

export const ThankyouPage = () => {
  return (
    // <!-- Thank You Page -->
    <div className="h-screen flex items-center w-11/12 m-auto">
      <div className="bg-gradient-to-b from-gray-100 to-white -mt-40">
        <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white border border-gray-200 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-lg mb-6">
            We're thrilled that you've chosen to shop with us. Your support
            means the world to us!
          </p>
          <p className="text-lg mb-6">
            Your order has been successfully processed, and you will receive an
            email with your order details shortly.
          </p>
          <p className="text-lg mb-6">
            If you have any questions or concerns, please don't hesitate to
            reach out to us at{" "}
            <a
              href="mailto:info@bookstore.com"
              class="text-blue-600 hover:text-blue-800"
            >
              info@bookstore.com
            </a>
            .
          </p>
          <Link to={"/"}>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
