import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import categoriesSlice from "./categoriesSlice";
import moviesSlice from "./moviesSlice";
import bookingSlice from "./bookingSlice";

const store = configureStore({
    reducer: {
        "auth": authSlice,
        "ui": uiSlice,
        "categories": categoriesSlice,
        "movies": moviesSlice,
        "bookings": bookingSlice,
    }
})

export default store;