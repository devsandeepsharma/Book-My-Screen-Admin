import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    initialized: false,
    admin: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.initialized = true
            state.admin = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.initialized = true
            state.admin = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;