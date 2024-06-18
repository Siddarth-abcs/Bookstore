import React, { useEffect, useState } from "react";
import axios from "axios";

export const Cart = ({cartItems}) => {

  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: 'Nike Air Max 2019',
      url: 'https://storage.googleapis.com/project-93474.appspot.com/51Hfv2MfNGL._SX331_BO1204203200_-1-768x768.webp',
      price: 120,
      quantity: 1,
      author: 'author name'
    },
    {
      id: 2,
      name: 'Adidas Ultra Boost',
      url: 'https://storage.googleapis.com/project-93474.appspot.com/51Hfv2MfNGL._SX331_BO1204203200_-1-768x768.webp',
      price: 150,
      quantity: 2,
      author: 'another author'
    }
  ]);

  // const getcart = async()=>{
  //   try {
  //   const response = await axios.get('https://bookapi-seven.vercel.app/cart');
  //   console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   getcart()
  // },[])

  console.log(cartItems.length,"cart")

  const handleChange = (id, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setCartProducts(cartProducts.map(product =>
      product.id === id ? { ...product, quantity: newQuantity > 0 ? newQuantity : 1 } : product
    ));
  };
  const plus = (id) => {
    setCartProducts(cartProducts.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };
  const minus = (id) => {
    setCartProducts(cartProducts.map(product =>
      product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };
  const getSubtotal = () => {
    return cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="h-screen bg-gray-100 pt-10">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartProducts.map((product) => (
            <div key={product.id} className="justify-between mb-6 rounded-lg bg-white pr-6 py-6 shadow-md flex justify-start">
              <img
                src={product.url}
                alt="product-image"
                className="h-36 rounded-lg"
              />
              <div className="ml-4 flex flex-col w-full justify-between">
                <div className="">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">
                    {product.author}
                  </p>
                </div>
                <div className="mt-4 flex flex-col ml-auto space-y-6">
                  <div className="flex items-center border-gray-100">
                    <span onClick={() => minus(product.id)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      {" "}
                      -{" "}
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      min={1}
                      value={product.quantity}
                      onChange={(e) => handleChange(product.id, e)}
                    />
                    <span onClick={() => plus(product.id)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      {" "}
                      +{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {product.price}.00 ₹
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹ {getSubtotal()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">₹ 4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">₹ {(parseFloat(getSubtotal()) + 4.99).toFixed(2)} INR</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};
