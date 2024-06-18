import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const Products = ({ Cart }) => {
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 md:gap-y-10 mx-8 mt-5">
      {data.map((product, index) => (
        <div key={index} className="group relative block overflow-hidden shadow-md">
          <img
            src={product.url}
            alt={product.name}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-80"
          />
          <div className="relative border border-gray-100 bg-white p-3">
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="mt-2 text-lg font-medium text-gray-700">
              <span className='line-through mr-2'>₹{product.price}</span>₹{product.discountprice}
            </p>
            <button
              onClick={() => Cart(product)}
              className="mt-2 block w-full rounded bg-yellow-400 p-2 text-md font-medium transition hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
