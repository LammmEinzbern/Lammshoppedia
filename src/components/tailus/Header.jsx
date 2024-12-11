import React from "react";
import { Link, useLocation } from "react-router-dom";
import Theme from "../daisyui/Theme";

const Header = () => {
  const location = useLocation();
  return (
    <header>
      <input
        type="checkbox"
        id="hbr"
        className="hbr peer"
        hidden
        aria-hidden="true"
      />
      <nav className="fixed z-20 w-full bg-white dark:bg-gray-700 backdrop-blur navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active md:relative md:bg-transparent dark:shadow-none">
        <div className="xl:container px-6 md:px-12 w-full">
          <div className="w-full flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
            {/* Logo Section */}
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

              {/* Hamburger Menu for Mobile */}
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

            {/* Navigation Menu */}
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

              <div className="flex flex-col sm:flex-row lg:space-y-0 lg:items-center lg:gap-3">
                <Link
                  to="/login"
                  className="relative flex h-9 ml-5 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-yellow-300 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:before:scale-95"
                >
                  <span className="relative text-sm font-semibold text-white dark:text-white">
                    Login
                  </span>
                </Link>
                <Theme />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
