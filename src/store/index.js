import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import categoriesSlice from "./categoriesSlice";

const store = configureStore({
    reducer: {
        "auth": authSlice,
        "ui": uiSlice,
        "categories": categoriesSlice,
    }
})

export default store;