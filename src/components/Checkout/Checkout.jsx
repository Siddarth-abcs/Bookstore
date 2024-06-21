import React, { useEffect, useState } from 'react';

export const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('bookcart');
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
  }, []);

  const calculateSubtotal = () => {
    return checkoutData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const shippingCost = 49; // Fixed shipping cost
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

// Function to format the date as 'dd MMM yyyy'
function formatDate(date) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
}

// Get the current date
const currentDate = new Date();

// Calculate the date 2 days from the current date
const futureDate2 = new Date();
futureDate2.setDate(currentDate.getDate() + 3);

// Calculate the date 7 days from the current date
const futureDate7 = new Date();
futureDate7.setDate(currentDate.getDate() + 6);

// Format the future dates
const formattedFutureDate2 = formatDate(futureDate2);
const formattedFutureDate7 = formatDate(futureDate7);

// Display the dates in the desired format
console.log(`${formattedFutureDate2} -\n${formattedFutureDate7}`);


const deleteProduct = (product) => {
  const updatedCart = checkoutData.filter(p => p._id !== product._id);
  setCheckoutData(updatedCart);
  localStorage.setItem('bookcart', JSON.stringify(updatedCart));
};

  return (
    <div className='w-11/12 my-6 mx-auto'>
      {/* part1 trust */}
      <div className='text-center'>
        <h2 className='text-3xl my-4 font-semibold'>You are almost there</h2>
        <p className='text-base font-medium text-gray-700'>
          Complete Your Payment Now And Get Your Favorite Books At Your Doorstep.
        </p>
      </div>

      {/* client address information */}
      <div className='w-5/6 mx-auto my-8'>
        <h2 className='text-xl my-4 font-bold'>Billing details</h2>
        <form>
          <div className="mb-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name *"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <label
              htmlFor="name"
              className="mb-3 pt-4 block text-base text-[#07074D]"
            >
              Country / Region* <br /> <span className='text-xl font-medium'>India</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="House number and street name *"
              className="w-full mb-3 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="apartment"
              id="apartment"
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="landmark"
              id="landmark"
              placeholder="Landmark *"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Town / City *"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="state"
              id="state"
              placeholder="State *"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="pin"
              id="pin"
              placeholder="Pin *"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address *"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone Number *"
              className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </form>
      </div>

      {/* Your Order */}
      <div>
        <h2 className='text-xl my-4 font-bold'>Your order</h2>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Product</h2>
            <h2 className="text-lg font-bold text-gray-800">Subtotal</h2>
          </div>
          {checkoutData.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center relative">
                <img src={item.url} className="w-16 h-16 rounded-md mr-4" alt={item.name} />
                <span className="absolute -top-3 left-0 text-red-500 text-2xl font-bold" onClick={()=>deleteProduct(item)}>×</span>
                <div>
                  <h3 className="text-gray-800 font-medium">{item.name}</h3>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 font-medium">x {item.quantity}</span>
                <span className="text-gray-800 font-medium ml-4">₹{item.price}</span>
              </div>
            </div>
          ))}
          <hr className="border-t py-2 border-gray-400 h-px" />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Subtotal</h2>
            <h2 className="text-lg font-bold text-gray-800">₹{subtotal.toFixed(2)}</h2>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Shipping</h2>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800">Standard Delivery:</h2>
              <h2 className="text-lg font-semibold text-gray-800">₹{shippingCost.toFixed(2)}</h2>
              <h2 className="text-lg font-semibold text-green-500">Estimated Delivery Date:</h2>
              <h2 className="text-lg font-semibold text-green-500">{formattedFutureDate2} - {formattedFutureDate7}</h2>
            </div>
          </div>
          <hr className="border-t pb-2 border-gray-400 h-px" />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Total</h2>
            <h2 className="text-lg font-bold text-gray-800">₹{total.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
