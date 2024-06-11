import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://bookapi-seven.vercel.app/products')
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-4 mx-8 mt-5">
      {data.map((products, index) => {
        return (
          <a href="#" key={index} className="group relative block overflow-hidden shadow-md">
            <img
              src={products.url}
              alt={products.name}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-80"
            />
            <div className="relative border border-gray-100 bg-white p-3">
              <h3 className="text-sm font-medium text-gray-900">{products.name}</h3>
              <p className="mt-2 text-lg font-medium text-gray-700"> <span className='line-through mr-2'>₹{products.price}</span>₹{products.discountprice} </p>
              <form className="mt-2">
                <button
                  className="block w-full rounded bg-yellow-400 p-2 text-md font-medium transition hover:scale-105"
                >
                  Add to Cart
                </button>
              </form>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Products;
