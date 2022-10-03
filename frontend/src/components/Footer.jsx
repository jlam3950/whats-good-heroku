import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo_img.jpg";

const Footer = () => {
  return (
      <footer className="p-4 bg-gray-800 w-full shadow md:px-6 md:py-8 dark:bg-gray-900 relative">
        <div className="sm:flex sm:items-center sm:justify-between">
          <NavLink
            to="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src={logo} className="mr-3 h-8" alt="Flowbite Logo" />
            <span></span>
          </NavLink>
        <span className="block text-sm sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://github.com/jlam3950" className="hover:underline">
            What's Good ™
          </a>
        </span>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <NavLink to="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/contact" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <div className="custom-shape-divider-top-1663701495 absolute">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div> */}
      </footer>
  );
};

export default Footer;
