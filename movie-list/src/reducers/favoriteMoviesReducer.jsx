import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoriteMovieSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    setFavoriteMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFavoriteMovies } = favoriteMovieSlice.actions;
export default favoriteMovieSlice.reducer;
