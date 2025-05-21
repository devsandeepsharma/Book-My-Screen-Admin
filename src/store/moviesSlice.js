import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload;
        },
        addMovie(state, action) {
            state.movies.push(action.payload);
        },
        removeMovie(state, action) {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
        },
        updateMovie(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.movies.findIndex(movie => movie.id === id);
            if (index !== -1) {
                state.movies[index] = {
                    ...state.movies[index],
                    ...updatedData
                };
            }
        },
    }
})

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;