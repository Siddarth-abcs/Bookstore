import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Products } from "./components/Products/Products";
import { Cart } from "./components/Cart/Cart";
import { Checkout } from "./components/Checkout/Checkout";
import { Footer } from "./components/Footer/Footer";
import { Contact } from "./components/Contact/Contact";
import { Terms } from "./components/TermsConditions/Terms";
import { Productpage } from "./components/Productpage/Productpage";
import { ThankyouPage } from "./components/ThankyouPage/ThankyouPage";
import axios from "axios";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("bookcart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    try {
      axios.get("https://bookapi-seven.vercel.app/user");
    } catch (error) {
      console.log(error);
    }
  });

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  // console.log("Cart items updated:", cartItems);
  useEffect(() => {
    localStorage.setItem("bookcart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Products Cart={addToCart} />} />
        <Route
          path="/product/:name"
          element={<Productpage Cartpage={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thankyou" element={<ThankyouPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
