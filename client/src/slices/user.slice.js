import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {

      console.log("payload: ", action.payload);

      state.users = action.payload;
    },
  },
});

export const {
  setUsers,
} = userSlice.actions;

export const selectUsers = (state) => state.users;

export default userSlice.reducer;
