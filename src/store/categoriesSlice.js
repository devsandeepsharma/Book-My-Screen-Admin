import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },
        addCategory(state, action) {
            state.categories.push(action.payload);
        },
        removeCategory(state, action) {
            state.categories = state.categories.filter(cat => cat.id !== action.payload);
        },
        updateCategory(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.categories.findIndex(cat => cat.id === id);
            if (index !== -1) {
                state.categories[index] = {
                    ...state.categories[index],
                    ...updatedData
                };
            }
        },
    }
})

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;