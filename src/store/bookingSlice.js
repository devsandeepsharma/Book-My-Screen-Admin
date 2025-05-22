import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings: []
}

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setBookings(state, action) {
            state.bookings = action.payload;
        }
    }
})

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;