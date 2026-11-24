import { createSlice } from "@reduxjs/toolkit";

const savedBookings = JSON.parse(
  localStorage.getItem("rentease_bookings") || "null"
);

const bookingSlice = createSlice({
  name: "bookings",

  initialState: {
    items: savedBookings || [],
  },

  reducers: {
    addRequest: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: Date.now(),
        status: "Pending",
      });
    },

    updateStatus: (state, action) => {
      const request = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (request) {
        request.status = action.payload.status;
      }
    },

    cancelRequest: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addRequest,
  updateStatus,
  cancelRequest,
} = bookingSlice.actions;

export default bookingSlice.reducer;