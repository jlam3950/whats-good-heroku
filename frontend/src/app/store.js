import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/loginSlice";
import restaurantReducer from "../redux/nearbyRestaurantsSlice.js" 

export default configureStore({
    reducer:{
      user: loginReducer, 
      restaurantList: restaurantReducer
    }
  })
  