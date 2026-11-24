import { createSlice } from "@reduxjs/toolkit";
import { initialRooms } from "../data/rooms";

const savedRooms = JSON.parse(
  localStorage.getItem("rentease_rooms") || "null"
);

const roomSlice = createSlice({
  name: "rooms",

  initialState: {
    items: savedRooms || initialRooms,
  },

  reducers: {
    addRoom: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: Date.now(),
      });
    },

    deleteRoom: (state, action) => {
      state.items = state.items.filter(
        (room) => room.id !== action.payload
      );
    },
  },
});

export const { addRoom, deleteRoom } = roomSlice.actions;

export default roomSlice.reducer;