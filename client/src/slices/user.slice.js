import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {
  setUser,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
