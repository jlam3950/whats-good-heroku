import React from "react";
import imposter from "../images/contact_images/imposterSeth.jpg";
import jeff from "../images/contact_images/jeff.jpg";

const About = () => {
  return (
    <div className="flex flex-col min-w-full items-center  min-h-screen">
      {/* <div className = 'text-4xl font-bold mt-5 md:mb-5 '> */}
      <h1 className="text-3xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight mt-5 animate-fade-in-down">
        Meet The Team
      </h1>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center justify-center text-2xl mt-5 md:flex-row md:space-x-6">
          <div className="flex justify-end">
            <img src={imposter} className="rounded-md m-4 px-4" alt=""></img>
          </div>
          <div className="flex flex-col justify-center md:w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            laudantium dolor dolores voluptates! Dolores totam reiciendis fuga
            tempore a? Sequi?
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center justify-center text-2xl mt-5 md:flex-row md:space-x-6">
          <div className="flex justify-end">
            <img src={jeff} className="rounded-md m-4 px-4 h-48" alt=""></img>
          </div>
          <div className="flex flex-col justify-center md:w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            laudantium dolor dolores voluptates! Dolores totam reiciendis fuga
            tempore a? Sequi?
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
