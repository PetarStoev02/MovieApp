import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteCardActionsComponent from "./FavoriteCardActions";
import { getMovies } from "../../api/serverAPI";
import { getMoviesByListType } from "../../api/getMoviesByListType";
import { setFavoriteMovies } from "../../reducers/favoriteMoviesReducer";
import { setWatchedMovies } from "../../reducers/watchedMoviesReducer";
import { setwishlistedMovies } from "../../reducers/wishlistedMoviesReducer";
import { toggleDeleteAsync } from "../../reducers/cardReducer";

const MyMovies = () => {
  const filterType = useSelector((state) => state.filter);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);
  const watchedMovies = useSelector((state) => state.watchedMovies);
  const wishlistedMovies = useSelector((state) => state.wishlistedMovies);
  const dispatch = useDispatch();

  const [listName, setListName] = useState("");

  useEffect(() => {
    if (filterType === 10) {
      setListName("Watched Movies");
    } else if (filterType === 20) {
      setListName("Favorite Movies");
    } else if (filterType === 30) {
      setListName("Wishlisted Movies");
    } else {
      setListName("All Movies");
    }
  }, [filterType]);

  const getFilteredMovies = () => {
    if (filterType === 10) {
      return watchedMovies;
    } else if (filterType === 20) {
      return favoriteMovies;
    } else if (filterType === 30) {
      return wishlistedMovies;
    } else {
      return [...watchedMovies, ...favoriteMovies, ...wishlistedMovies];
    }
  };

  const handleDeleteClick = (cardId) => {
    dispatch(toggleDeleteAsync(cardId));
    window.location.reload();
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMovies();
        if (response && response.ok) {
          const data = await response.json();
          const [
            favoriteData,
            watchedData,
            wishlistedData,
          ] = await Promise.all([
            getMoviesByListType(data, "favorites"),
            getMoviesByListType(data, "watched"),
            getMoviesByListType(data, "wishlist"),
          ]);

          const favoriteResults = favoriteData.results.map((movie) => {
            const matchedDataMovie = data.find(
              (dataMovie) => dataMovie.movieId === movie.id
            );
            return matchedDataMovie
              ? { ...movie, _id: matchedDataMovie._id, list: "favorite" }
              : movie;
          });

          const watchedResults = watchedData.results.map((movie) => {
            const matchedDataMovie = data.find(
              (dataMovie) => dataMovie.movieId === movie.id
            );
            return matchedDataMovie
              ? { ...movie, _id: matchedDataMovie._id, list: "watched" }
              : movie;
          });

          const wishlistedResults = wishlistedData.results.map((movie) => {
            const matchedDataMovie = data.find(
              (dataMovie) => dataMovie.movieId === movie.id
            );
            return matchedDataMovie
              ? { ...movie, _id: matchedDataMovie._id, list: "wishlisted" }
              : movie;
          });

          dispatch(setFavoriteMovies(favoriteResults));
          dispatch(setWatchedMovies(watchedResults));
          dispatch(setwishlistedMovies(wishlistedResults));
        } else {
          console.error(
            "Failed to get movies:",
            response ? response.status : "Unknown"
          );
          setError(true);
        }
      } catch (error) {
        console.error("Error while getting movies:", error);
        setError(true);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>{listName}</h1>
      {error ? (
        <p>No movies were found</p>
      ) : (
        <Grid container spacing={2}>
          {getFilteredMovies().map((movie) => (
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FavoriteCardActionsComponent
                    cardId={movie._id}
                    movieId={movie.id}
                    listType={movie.list}
                  />
                  <Button
                    size="small"
                    onClick={() => handleDeleteClick(movie._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default MyMovies;
