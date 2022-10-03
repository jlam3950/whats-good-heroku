import React from "react";
import { NavLink } from "react-router-dom";

import altHero from "../images/alt_hero.jpg";


const Home = () => {
  return (
    <>
      <div className="flex flex-col md:items-center mx-auto mt-5 md:space-y-0 z-10 min-h-screen relative">
        <div className="flex flex-col mx-auto md:flex-row">
          <div className="flex items-center">
            <div className="flex space-x-1">
              <button className="bg-green-500 hover:bg-green-700 shadow-xl text-white font-bold m-2 py-2 px-4 border-blue-700 rounded md:text-xl">
                <NavLink to="/search">Check What's Good Around Me</NavLink>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center items-center md:py-0 md:flex-row md:justify-evenly">
          <div className="flex flex-col items-center mt-10 md:mt-4 md:mb-0 lg:mb-24 text-center tracking-tight font-extrabold text-5xl md:ml-8 md:text-6xl lg:text-6xl xl:text-7xl md:w-1/2">   
            What's Good?
            <div class = 'text-4xl max-w-lg text-white drop-shadow-2xl findthe md:text-5xl'>
            Find the best items at every restaurant.
            </div>
          </div>
          <div className="mt-5 -mb-20 md:w-1/2 mr-5">
            {/* <img src={sushi} className="" alt="" /> */}
            <img src={altHero} className="" alt="" />
          </div>
        </div>
      </div>
        
        {/* <div className="mx-auto bg-blue-600">
          <h1 className="text-2xl text-center px-5 font-extrabold tracking-tight py-6  findthe md:text-3xl lg:text-4xl md:text-center">
            Find the best items at every restaurant.
          </h1>
          <p className="text-center px-5 text-darkGrey md:text-center md:mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            quidem repudiandae et dignissimos, similique voluptatem, maiores
            dolorem eveniet aperiam deserunt qui illum veniam tempora dolorum`
            eos reiciendis odit quos quisquam quas corrupti fuga laudantium.
            Quas.
          </p>
        </div> */}

      {/* <div class = 'display flex justify-end -z-10'>
      <div className="bg-red-600 -mt-32 mr-2 w-1/6 h-32 absolute -z-20"></div>
      </div> */}

      {/* blue bar */}
      {/* <div className="bg-blue-600 mt-32 w-full h-32 bluebar absolute -z-50"></div> */}

      {/* <div className="md:mt-8 mx-auto md:flex md:justify-center md:space-x-10"> */}

      {/* Home Page Cards */}
      {/* <div className="relative flex flex-col items-center justify-evenly mt-20 md:mt-20 md:flex-row">
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
          <NavLink to="#" className="flex justify-center">
            <img
              className="rounded-t-lg p_food h-48 md:h-64 w-full"
              src={hero}
              alt=""
            />
          </NavLink>
          <div className="p-5">
            <NavLink to="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The 50 Best Restaurants to Eat
              </h5>
            </NavLink>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <NavLink
              to="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
          <NavLink to="#" className="flex justify-center">
            <img
              className="rounded-t-lg p_food h-48 md:h-64 w-full"
              src={food1}
              alt=""
            />
          </NavLink>
          <div className="p-5">
            <NavLink to="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The 50 Best Restaurants to Eat
              </h5>
            </NavLink>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <NavLink
              to="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
          <NavLink to="flex justify-center">
            <img
              className="rounded-t-lg p_food h-48 md:h-64 w-full"
              src={food2}
              alt=""
            />
          </NavLink>
          <div className="p-5">
            <NavLink to="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The 50 Best Restaurants to Eat
              </h5>
            </NavLink>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <NavLink
              to="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
      </div> */}
      {/* 
        <div className=" max-w-6xl mx-auto mt-16  md:px-5 md:py-2 md:mb-32 sm:px-6 lg:px-8 bg-teal-500">
            <div className="mt-8 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 mr-2 dark:bg-gray-800 mt-5 sm:rounded-lg">
                        <h1 className="text-right text-3xl sm:text-5xl text-gray-800 dark:text-white tracking-tight">
                            What's good for breakfast?
                        </h1>
                        <div class = 'text-right'>
                          <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                              Fill in the form to start a conversation
                          </p>
                        </div>
                    </div>
                      <img src = {food2} className= 'food_sub' alt = ''></img>
                </div>
            </div>
        </div> */}
    </>
  );
};

export default Home;
