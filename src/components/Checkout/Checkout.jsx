import axios from "axios";
import React, { useEffect, useState } from "react";

export const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("bookcart");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
  }, []);

  const calculateSubtotal = () => {
    return checkoutData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 799 ? 0 : 40;
  const total = subtotal + shippingCost;

  // Function to format the date as 'dd MMM yyyy'
  function formatDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
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
  // console.log(`${formattedFutureDate2} -\n${formattedFutureDate7}`);

  const deleteProduct = (product) => {
    const updatedCart = checkoutData.filter((p) => p._id !== product._id);
    setCheckoutData(updatedCart);
    localStorage.setItem("bookcart", JSON.stringify(updatedCart));
    if (updatedCart.length === 0) {
      window.location.href = "/";
    }
  };

  // Payment of Razorpay

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const storedData = localStorage.getItem("bookcart");
    const cartData = storedData ? JSON.parse(storedData) : [];

    // cod apyment method
    if (data.payment === "cod") {
      const newdata = {
        clientname: data.name,
        clientemail: data.email,
        clientnumber: data.phone,
        clientinfo: [
          data.address,
          data.apartment,
          data.landmark,
          data.city,
          data.state,
          data.pin,
        ],
        orderdate: new Date(), // Use current date for order date
        orderid: data.payment, // Use the orderId from jsonResponse
        products: cartData.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.url,
          language: item.language,
        })), // Assuming cartData is an array of products
        totalprice: total,
        paymentmethod: data.payment,
        paymentId: data.payment, // Use the paymentId from jsonResponse
      };
      console.log(newdata);
      try {
        const response = await axios.post(
          "https://bookapi-seven.vercel.app/order",
          newdata
        );
        // location for redirect
        window.location.href = "/thankyou";
      } catch (error) {
        console.log(error);
      }
      // Razorpay method start
    } else {
      // post on razarpay for crate orderid
      const amount = total * 100;
      const currency = "INR";
      const receiptId = "1234567890";

      const response = await fetch(
        "https://razorpay-server-nine.vercel.app/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency,
            receipt: receiptId,
          }),
        }
      );

      const order = await response.json();
      // console.log("order", order);

      var option = {
        key: "",
        amount: amount,
        currency: currency,
        name: "Bookstore",
        description: "Bookstore",
        image:
          "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihapqRA2Xl1FKt9IJSR-bJstANRJBNZYpXZfrGIloGul_ADFB5xSEp6LH-GNmU5t4nYL6HY-cFh90XV2NpBGPls5TaObTzKvVQ=w1860-h927",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };
          try {
            const validateResponse = await fetch(
              "https://razorpay-server-nine.vercel.app/validate",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
              }
            );
            const jsonResponse = await validateResponse.json();
            // console.log("json Response", jsonResponse);

            if (jsonResponse.msg === "Transction is legit!") {
              const newdatar = {
                clientname: data.name,
                clientemail: data.email,
                clientnumber: data.phone,
                clientinfo: [
                  data.address,
                  data.apartment,
                  data.landmark,
                  data.city,
                  data.state,
                  data.pin,
                ],
                orderdate: new Date(), // Use current date for order date
                orderid: data.payment, // Use the orderId from jsonResponse
                products: cartData.map((item) => ({
                  _id: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.url,
                  language: item.language,
                })), // Assuming cartData is an array of products
                totalprice: total,
                paymentmethod: data.payment,
                paymentId: data.payment, // Use the paymentId from jsonResponse
              };
              console.log(newdatar)
              try {
                const response = await axios.post(
                  "https://bookapi-seven.vercel.app/order",
                  newdatar
                );
                // location for redirect
                window.location.href = "/thankyou";
              } catch (error) {
                console.log(error);
              }
            } else {
              console.error("Validation failed:", jsonResponse.msg);
              // Handle validation failure (you may add redirection or alert here)
            }
          } catch (error) {
            console.error("Error during validation", error);
            // Handle validation error (you may add redirection or alert here)
          }
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#0D94FB",
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
      };

      var rzp1 = new Razorpay(option);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      event.preventDefault();
    }
  };

  return (
    <div className="w-11/12 my-12 mx-auto">
      {/* part1 trust */}
      <div className="text-center">
        <h2 className="text-3xl my-4 font-semibold">You are almost there</h2>
        <p className="text-base font-medium text-gray-700">
          Complete Your Payment Now And Get Your Favorite Books At Your
          Doorstep.
        </p>
      </div>
      {/* part2 Deaitles shiping payment order */}
      <div className="px-5 my-12 border-solid border-2 border-sky-200 rounded-lg shadow-lg">
        {/* client address information */}
        <div className="my-8">
          <h2 className="text-xl my-4 font-bold">Shipping details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <label
                htmlFor="name"
                className="mb-3 pt-4 block text-base text-[#07074D]"
              >
                Country / Region* <br />{" "}
                <span className="text-xl font-medium">India</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="House number and street name *"
                className="w-full mb-3 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark *"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Town / City *"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State *"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <input
                type="number"
                name="pin"
                placeholder="Pin *"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                className="w-full mb-4 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
            </div>
            <div>
              <h2 className="text-xl my-4 font-bold">Your order</h2>
              <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Product</h2>
                  <h2 className="text-lg font-bold text-gray-800">Subtotal</h2>
                </div>
                {checkoutData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div className="flex items-center relative">
                      <img
                        src={item.url}
                        className="w-16 h-16 rounded-md mr-4"
                        alt={item.name}
                      />
                      <span
                        className="absolute -top-3 left-0 text-red-500 text-2xl font-bold cursor-pointer"
                        onClick={() => deleteProduct(item)}
                      >
                        ×
                      </span>
                      <div>
                        <h3 className="text-gray-800 font-medium">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-800 font-medium">
                        x {item.quantity}
                      </span>
                      <span className="text-gray-800 font-medium ml-4">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
                <hr className="border-t py-2 border-gray-400 h-px" />
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Subtotal</h2>
                  <h2 className="text-lg font-bold text-gray-800">
                    ₹{subtotal.toFixed(2)}
                  </h2>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Shipping</h2>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Standard Delivery:
                    </h2>
                    <h2 className="text-lg font-semibold text-gray-800">
                      ₹{shippingCost == 0 ? "Free Delivery" : 40}
                    </h2>
                    <h2 className="text-lg font-semibold text-green-500">
                      Estimated Delivery Date:
                    </h2>
                    <h2 className="text-lg font-semibold text-green-500">
                      {formattedFutureDate2} - {formattedFutureDate7}
                    </h2>
                  </div>
                </div>
                <hr className="border-t pb-2 border-gray-400 h-px" />
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Total</h2>
                  <h2 className="text-lg font-bold text-gray-800">
                    ₹{total.toFixed(2)}
                  </h2>
                </div>

                {/* payment method */}

                <div className="bg-gray-100 p-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="razorpay"
                      name="payment"
                      value={"razorpay"}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  rounded-full"
                      checked
                      readOnly
                    />
                    <label
                      htmlFor="razorpay"
                      className="ml-2 flex items-center"
                    >
                      <img
                        src="https://th.bing.com/th/id/OIP.3915OPu9nRGi5zVY36VyQgHaFj?rs=1&pid=ImgDetMain"
                        alt=""
                        className="h-6 mx-2"
                      />
                      <div>
                        <span className="font-bold text-xl">
                          Pay by Razorpay
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="text-sm mt-4 bg-white p-2 rounded font-semibold">
                    Pay securely by UPI Or Credit or Debit card or Internet
                    Banking through Razorpay.
                  </div>
                  <div className="flex items-center mt-4 mb-2">
                    {total > 299 ? (
                      <>
                        <input
                          type="radio"
                          name="payment"
                          id="cod"
                          value={"cod"}
                          className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                          readOnly
                        />
                        <label htmlFor="cod" className="ml-2 font-bold text-ld">
                          Cash on Delivery
                        </label>
                      </>
                    ) : (
                      <div>
                        COD IS NOT AVAILABLE UNDER Rs.299.USE ANY ONLINE METHOD
                        OR SHOP ABOVE Rs.299.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-700 text-white text-xl font-bold py-3 my-8 w-full rounded flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="20"
                    height="20"
                    className="mr-2"
                  >
                    <path
                      d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Place Order ₹{total.toFixed(2)}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Part 3 Questions */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center font-bold mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <div className="text-global-accent text-center p-4 rounded-md shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">IS THIS WEBSITE LEGIT?</h2>
          <p className="text-gray-700">
            Don't Worry About Anything. Our Website Is Fully Legitimate. And We
            Follow All The Guidelines Of Government.
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
            All Books Are New & we dont sell photocopies..Please Visit our insta
            profile and check the Quality with images.
          </p>
        </div>
      </div>
    </div>
  );
};
