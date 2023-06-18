import { combineReducers } from "@reduxjs/toolkit";

import moviesReducer from "./reducers/movieReducer";
import tabReducer from "./reducers/tabReducer";
import cardReducer from "./reducers/cardReducer";
import searchReducer from "./reducers/searchReducer";
import favoriteMoviesReducer from "./reducers/favoriteMoviesReducer";
import watchedMoviesReducer from "./reducers/watchedMoviesReducer";
import wishlistedMoviesReducer from "./reducers/wishlistedMoviesReducer";
import filterReducer from "./reducers/filterReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  tab: tabReducer,
  card: cardReducer,
  searchQuery: searchReducer,
  favoriteMovies: favoriteMoviesReducer,
  watchedMovies: watchedMoviesReducer,
  wishlistedMovies: wishlistedMoviesReducer,
  filter: filterReducer,
});

export default rootReducer;
