import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const SelectUsername = (state) => state.user.username;

export const { updateUser } = loginSlice.actions;

export default loginSlice.reducer;
