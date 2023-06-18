import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

import CardActionsComponent from "./CardActionsComponent";
import { fetchMovies } from "../../api/moviesAPI";
import { searchMovies } from "../../api/searchMoviesAPI";
import { setMovies } from "../../reducers/movieReducer";
import { setSearchQuery } from "../../reducers/searchReducer";

import SearchBar from "../SearchBar/SearchBar"; // Import the SearchBar component

export default function Cards() {
  const movies = useSelector((state) => state.movies);
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      searchMoviesData(searchQuery);
    } else {
      fetchMoviesData();
    }
  }, [searchQuery]);

  const fetchMoviesData = () => {
    fetchMovies()
      .then((data) => {
        dispatch(setMovies(data.results));
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  const searchMoviesData = (query) => {
    searchMovies(query)
      .then((data) => {
        dispatch(setMovies(data.results));
      })
      .catch((error) => console.error("Error searching movies:", error));
  };

  const handleSearchQueryChange = (value) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <div>
      <SearchBar onSearchChange={handleSearchQueryChange} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
              <CardContent>
                <Typography
                  component="p"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {movie.originalTitleText.text}
                </Typography>

                {movie.primaryImage && movie.primaryImage.url ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.primaryImage.url}
                    alt={movie.originalTitleText.text}
                  />
                ) : (
                  <div>No image available</div>
                )}
              </CardContent>
              <CardActionsComponent cardId={movie.id} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
