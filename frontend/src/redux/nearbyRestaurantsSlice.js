import { createSlice } from "@reduxjs/toolkit";

const initialState = {restList : []};

const nearbyRestaurantsSlice = createSlice({
  name: "restaurantList",
  initialState,
  reducers: {
    updateRestaurantList: (state, action) => {
      state.restList = action.payload;
    },
  },
});

export const { updateRestaurantList} = nearbyRestaurantsSlice.actions;

export default nearbyRestaurantsSlice.reducer;
