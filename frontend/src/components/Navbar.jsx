import React from "react";
import { useSelector } from "react-redux";
import { SelectUsername } from "../redux/loginSlice";
import { NavLink } from "react-router-dom";
import logo from '../images/logo_img.jpg'


const Navbar = () => {
  const username = useSelector(SelectUsername);
  const userLoginCheck = username != null;

  return (
    <nav>
      <div className="">
        <div className="flex justify-between h-16 px-10 items-center">
          <div className="flex items-center space-x-2 lg:ml-4 ">
            <NavLink to="/">
              <h1 className="text-xl -m-4 md:mr-2 lg:text-3xl font-bold cursor-pointer ">
                  <img src = {logo} className = 'h-8 mb-1' alt =''></img>

              </h1>
            </NavLink>
            <div className="hidden md:flex justify-around space-x-4">
              <NavLink className="hover:underline text-gray-700" to="/search">
                Search
              </NavLink>
              <NavLink className="hover:underline text-gray-700" to="/about">
                About
              </NavLink>
              <NavLink
                className="hover:underline text-gray-700"
                to="/contact"
              >
                Contact
              </NavLink>
            </div>
          </div>

          <div className="flex space-x-2 -m-4 lg:mr-2  md:space-x-6 items-center">
            <NavLink className="text-gray-800 text-sm transform transition duration-500 hover:scale-105" to= {userLoginCheck ? '/profile' : '/login'}>
              {userLoginCheck ? `hi, ${username}` : "LOGIN"} 
            </NavLink>
            <NavLink
              className="bg-red-500 p-2 sm:px-4 sm:py-2 rounded hover:bg-red-400 text-sm text-white"
              to= {userLoginCheck ? '/logout' : '/register'}
            >
              {userLoginCheck ? `SIGN OUT` : "SIGN UP"}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
