import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(
  localStorage.getItem("rentease_user") || "null"
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;