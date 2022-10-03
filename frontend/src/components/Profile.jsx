import React from "react";
import { useSelector } from "react-redux";
import { SelectUsername } from "../redux/loginSlice";
import avatar from "../images/avatar.jpg";
// import { NavLink } from "react-router-dom";

const Profile = () => {
  const username = useSelector(SelectUsername);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl sm:text-5xl text-center text-gray-800 dark:text-white font-extrabold tracking-tight mt-5 -mb-8">
        Profile
      </h1>
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-gray-100 w-full shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative flex justify-center">
                <img
                  src={avatar}
                  className="shadow-xl rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 avatar"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full text-center mt-16">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    1
                  </span>
                  <span className="text-sm text-slate-400">Reviews</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    3
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    5
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {username}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              Bloomington, IN
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  Foodie, traveler, and programmer.
                </p>
                <a
                  href="www.google.com"
                  className="font-normal text-slate-700 hover:text-slate-400"
                >
                  <button className="bg-green-500 hover:bg-green-700 px-5 py-2 text-white rounded">
                    Follow Account
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
