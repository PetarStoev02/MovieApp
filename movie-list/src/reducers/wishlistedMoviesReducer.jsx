import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistedMovieSlice = createSlice({
  name: "wishlistedMovies",
  initialState,
  reducers: {
    setwishlistedMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setwishlistedMovies } = wishlistedMovieSlice.actions;
export default wishlistedMovieSlice.reducer;
