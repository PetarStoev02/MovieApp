import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchedMovieSlice = createSlice({
  name: "watchedMovies",
  initialState,
  reducers: {
    setWatchedMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWatchedMovies } = watchedMovieSlice.actions;
export default watchedMovieSlice.reducer;
