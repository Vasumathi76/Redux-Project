import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roomReducer from "./roomSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    bookings: bookingReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("rentease_user", JSON.stringify(state.auth.user));
  localStorage.setItem("rentease_rooms", JSON.stringify(state.rooms.items));
  localStorage.setItem("rentease_bookings", JSON.stringify(state.bookings.items));
});