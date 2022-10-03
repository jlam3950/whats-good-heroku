import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const [userReg, setUserReg] = useState("");
  const [pwReg, setPwReg] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PWconfirmation = useRef();

  const saveUser = (login) =>{
    console.log(login);
    dispatch(updateUser(login));
  }

  const registerUser = (e) => {
    e.preventDefault();
    console.log(userReg, pwReg);
    if(pwReg !== PWconfirmation.current.value){
      alert('Sorry, passwords do not match')
      return; 
    }

    if(userReg === '' || pwReg === '' || userReg.length < 4 || pwReg.length < 8){
      alert('Please input a username, and password (8 characters minimum)');
      return;
    }

    Axios({
      method: "post",
      data: {
        username: userReg,
        password: pwReg,
      },
      withCredentials: true,
      url: "http://localhost:5500/register",
    }).then(
      (res) => setData(res.data),
      setTimeout(() => {
        saveUser(userReg);
        navigate('/');
        // window.location.replace("http://localhost:3000");
      }, 2000)
    );
  };

  let saveReg = (e) => {
    return setUserReg(e.target.value);
  };

  let savePw = (e) => {
    return setPwReg(e.target.value);
  };

  return (
    <div className=" h-screen">
      <div className="flex justify-center">
        <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
          <h1 className="flex justify-center mb-8 font-bold text-3xl">Sign Up!</h1>
          <form action="">
            <div className="mb-6">
              <label for="name" className="block text-gray-800 font-bold">
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                onChange={saveReg}
                className="w-full -mb-2 border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <div>
              <label for="email" className="block text-gray-800 font-bold">
                Password:
              </label>
              <input
                type="password"
                placeholder="password"
                onChange={savePw}
                required
                className="w-full border -mb-2 border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
             <div
                className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block invisible hover:text-indigo-600"
              >
                Forget Password
              </div>
            </div>
            <div>
              <label for="email" className="block text-gray-800 font-bold">
                Confirm Password:
              </label>
              <input
                type="password"
                placeholder="password"
                ref = {PWconfirmation}
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                required
              />
            </div>

        
                
            <button
              onClick={registerUser}
              className="cursor-pointer py-2 px-4 block mt-3 bg-red-500 text-white font-bold w-full text-center rounded"
            >
              Register
            </button>
            <div className="text-center pt-3"> {data} </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
