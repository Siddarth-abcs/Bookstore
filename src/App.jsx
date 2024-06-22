import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Products } from "./components/Products/Products";
import { Cart } from "./components/Cart/Cart";
import { Checkout } from "./components/Checkout/Checkout";
import { Footer } from "./components/Footer/Footer";
import { Terms } from "./Terms And Conditions/Terms";
import { Contact } from "./components/Contact/Contact";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("bookcart");
    return savedCart ? JSON.parse(savedCart) : [];
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

  useEffect(() => {
    localStorage.setItem("bookcart", JSON.stringify(cartItems));
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  console.log(cartItems);

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Products Cart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
