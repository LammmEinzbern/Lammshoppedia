import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Theme from "../daisyui/Theme";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart"; // Import useCart untuk mengakses state keranjang

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const uniqueProducts = new Set(cart.map((item) => item.id_produk)).size;
      setCartCount(uniqueProducts);
    } else {
      setCartCount(0);
    }
  }, [cart]);
  return (
    <header>
      <input
        type="checkbox"
        id="hbr"
        className="hbr peer"
        hidden
        aria-hidden="true"
      />
      <nav className="fixed z-50 w-full bg-white dark:bg-gray-700 backdrop-blur navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active md:relative md:bg-transparent dark:shadow-none">
        <div className="xl:container px-6 md:px-12 w-full">
          <div className="w-full flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
            <div className="w-full flex justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <span className="text-base font-bold text-black dark:text-white">
                  Logo
                </span>
              </Link>

              <label
                htmlFor="hbr"
                className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden ml-auto"
              >
                <div
                  aria-hidden="true"
                  className="m-auto h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                ></div>
                <div
                  aria-hidden="true"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                ></div>
              </label>
            </div>

            <div className="navmenu hidden w-full flex-wrap justify-end items-center space-y-8 p-6 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 dark:shadow-none dark:border-gray-700 lg:border-0">
              <div className="text-black dark:text-gray-300 lg:pr-4">
                <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                  <li>
                    <Link
                      to="/"
                      className={`${
                        location.pathname === "/" ? "text-red-400" : ""
                      } block md:px-4 transition hover:text-blue-500 dark:hover:text-primaryLight`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`${
                        location.pathname === "/about" ? "text-red-400" : ""
                      } block md:px-4 transition hover:text-blue-500 dark:hover:text-primaryLight`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/product"
                      className={`${
                        location.pathname === "/product" ? "text-red-400" : ""
                      } block md:px-4 transition hover:text-blue-500 dark:hover:text-primaryLight`}
                    >
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`${
                        location.pathname === "/contact" ? "text-red-400" : ""
                      } block md:px-4 transition hover:text-blue-500 dark:hover:text-primaryLight`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <Link to="/cart" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800 dark:text-gray-300 hover:text-gray-500 transition-all duration-300"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="flex flex-col sm:flex-row lg:space-y-0 lg:items-center lg:gap-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="relative flex h-9 ml-5 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-yellow-300 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:before:scale-95"
                    >
                      <span className="relative text-sm font-semibold text-white dark:text-white">
                        Profile
                      </span>
                    </Link>
                    <Theme />
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="relative flex h-9 ml-5 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-yellow-300 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:before:scale-95"
                    >
                      <span className="relative text-sm font-semibold text-white dark:text-white">
                        Login
                      </span>
                    </Link>
                    <Theme />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
