import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/loginSlice";
import Axios from 'axios';


const Logout = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const removeUser = (login) =>{
    dispatch(updateUser(login));
  }
    const retrieveUser = () => {
      Axios({
      method: "GET",
      withCredentials: true,
      // url: "http://localhost:5500/user",
      url:  "https://jefflwhatsgood.herokuapp.com/user",
    }).then((res) => {
      setData(res.data); 
      console.log(res.data);
    });
    }

    const logOff  = () => {
      Axios({
        method: "post",
        withCredentials: true,
        // url: "http://localhost:5500/login",
        url:  "https://jefflwhatsgood.herokuapp.com/login",
      }).then( setTimeout(() =>{
        removeUser(null);
        navigate('/');
      }, 2000));
    }

  useEffect(() => {
    retrieveUser();
  }, [])


  return (
    <div class = 'h-screen flex flex-col items-center mt-5 font-bold'>{data ? <h1>Are you sure you want to log out, {data.username}?</h1> : null }
    <div class = 'w-40'>
      <button class = 'cursor-pointer py-2 px-4 block mt-3 bg-red-500 text-white font-bold w-full text-center rounded' onClick = {logOff}> Log Off</button>
    </div>
      <NavLink to="/" class = 'w-40'>
              <button className="cursor-pointer py-2 px-4 block mt-3 bg-green-500 text-white font-bold w-full text-center rounded">
               Back to Home Page
              </button>
      </NavLink>
    </div>
  )
}

export default Logout