import React from 'react'
import { NavLink } from 'react-router-dom';

const RestaurantCard = (props) => {
  console.log(props)
  return (
    <div className="card bg-gray-100 border rounded-md shadow-xl mx-2 md:mx-0 mb-2 mt-2 md:w-5/6  md:card-side">

    <div className="flex flex-row">
       <div className="flex justify-center py-1 w-2/5">
       <img
         src={props.props.image_url}
           className="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 md:mb-0 card_image"        
          //  className="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"        
           alt="restaurant"
         />
       </div>
       <div className="card-body w-3/5 text-xs text-left sm:text-sm lg:text-lg">
         <h2 className="card-title pt-2 font-bold">{props.props.name}</h2>
         <hr></hr>
         <p>Yelp Review: {props.props.rating}/5</p>
         <p>Price: {props.props.price}</p>
         <p className="">
           Category: {props.props.categories[0].title}
         </p>
         <div className ='flex justify-end'> 
         <NavLink to = { `/restaurant/${props.props.id}`}>
         <button
             onClick=""
             id={props.props.id}
             className="bg-blue-500 text-white m-2  px-8 border border-blue-700 rounded "
           >
           Reviews
           </button></NavLink></div>  

       </div>
      </div>
    </div>
   )
}

export default RestaurantCard;
