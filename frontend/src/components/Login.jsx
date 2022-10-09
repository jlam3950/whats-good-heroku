import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/loginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [userLogin, setUserLogin] = useState("");
  const [pwLogin, setPwLogin] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useNavigate();

  // const google = () => {
  //   window.open("http://localhost:5500/google", "_self")
  // }

  const saveUser = (login) => {
    dispatch(updateUser(login));
  };

  const loginUser = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      data: {
        username: userLogin,
        password: pwLogin,
      },
      withCredentials: true,
      // url: "http://localhost:5500/login",
      url:  "/login",
    }).then((res) => {
      console.log(res.data)
      switch (res.data) {
        case "No matching credentials":
          setData(res.data)
          break;
        case "Successfully Authenticated":
          setData(res.data);
          setTimeout(() => {
            saveUser(userLogin);
            // navigate("/");
            history(-1);
          }, 2000);
          break;
        default: 
         console.log('')
      }      
    });
  };

  return (
    <div className=" h-screen">
      <div className="flex justify-center">
        <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl">
          <h1 className="flex justify-center mb-8 font-bold text-3xl">Sign In</h1>
          <form action="" className = '-mt-4'>
            <div className="mb-6">
            {/* <div className = 'flex justify-evenly'>
              <div className = 'flex items-center justify-center border w-16 h-16 text-white rounded py-4 px-4 shadow-xl bg-red-600 hover:bg-red-700 mb-5 cursor-pointer' onClick = {google}>
                <FaGoogle className ='text-3xl'/>  
              </div>
              <div className = 'flex items-center justify-center border w-16 h-16 text-white rounded py-2 px-2 shadow-xl bg-blue-600 hover:bg-blue-700 mb-5 cursor-pointer' onClick = {google}>
                <FaFacebook className ='text-3xl' />
              </div>
              <div className = 'flex items-center justify-center border w-16 h-16 text-white rounded py-2 px-2 shadow-xl bg-gray-700 hover:bg-gray-800 mb-5 cursor-pointer' onClick = {google}>
                <FaGithub className ='text-3xl' />
              </div>
            </div> */}
            <div className ='text-center m-2'>
              <span className =''><hr></hr></span>
            </div>
              <label for="name" className="block text-gray-800 font-bold">
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                onChange={(e) => setUserLogin(e.target.value)}
                className="w-full -mb-2 border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <div>
              <label for="password" className="block text-gray-800 font-bold">
                Password:
              </label>
              <input
                type="password"
                name="email"
                id="email"
                placeholder="password"
                onChange={(e) => setPwLogin(e.target.value)}
                className="w-full -mb-2 border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              <div
                className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block invisible hover:text-indigo-600"
              >
                Forget Password
              </div>
            </div>
            <button
              onClick={loginUser}
              className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            >
              Login
            </button>
            <NavLink to="/register">
              <button className="cursor-pointer py-2 px-4 block mt-3 bg-red-500 text-white font-bold w-full text-center rounded">
                New User?
              </button>
            </NavLink>
            <div className="text-center pt-3"> {data} </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
