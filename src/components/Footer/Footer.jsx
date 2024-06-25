import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-200 pt-4 text-center">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4 mb-2 md:mb-0">
            <p className="text-lg text-gray-600">
              &copy; 2024 BooksToHome | Designed & Developed by BookToHome
            </p>
          </div>
          <div className="w-full md:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            <ul className="list-none mb-0 text-base">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="mx-2">Track Order</span>{" "}
                  <Link to={"/contact"}>
                    <span className="mx-2">Contact</span>
                  </Link>{" "}
                  <Link to={"/terms"}>
                    <span className="mx-2">Terms And Conditions</span>
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="mx-2">Terms & Conditions</span>{" "}
                  <span className="mx-2">Sitemap</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
