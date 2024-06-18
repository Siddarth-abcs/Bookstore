import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Products } from './components/Products/Products';
import { Cart } from './components/Cart/Cart';
import axios from 'axios';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item) => {
    try {
      const response = await axios.post('https://bookapi-seven.vercel.app/cart', item);
      console.log(response.data, "app");
      setCartItems(response)
    } catch (error) {
      console.error(error);
    }
  };
  

  // console.log(cartItems,"app");

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path='/' element={<Products Cart={addToCart} />} />
        <Route path='/cart' element={<Cart cartItems={cartItems} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
