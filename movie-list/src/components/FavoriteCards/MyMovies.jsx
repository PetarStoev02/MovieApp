import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActionsComponent from "../Card/CardActionsComponent";
import { getMovies } from "../../api/serverAPI";
import { favoriteMoviesAPI } from "../../api/favoriteMoviesAPI";
import { watchedMoviesAPI } from "../../api/watchedMoviesAPI";
import { wishListedMoviesAPI } from "../../api/wishListedMoviesAPI";
import { setFavoriteMovies } from "../../reducers/favoriteMoviesReducer";
import { setWatchedMovies } from "../../reducers/watchedMoviesReducer";
import { setwishlistedMovies } from "../../reducers/wishlistedMoviesReducer";
import { toggleDeleteAsync } from "../../reducers/cardReducer";

const MyMovies = () => {
  const filterType = useSelector((state) => state.filter);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);
  const watchedMovies = useSelector((state) => state.watchedMovies);
  const wishlistedMovies = useSelector((state) => state.wishlistedMovies);
  const deletedCardId = useSelector((state) => state.card.deletedCardId); // Assuming you have a state slice for deleted card ID
  const dispatch = useDispatch();

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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMovies();
        if (response && response.ok) {
          const data = await response.json();
          const [favoriteData, watchedData, wishlistedData] = await Promise.all([
            favoriteMoviesAPI(data),
            watchedMoviesAPI(data),
            wishListedMoviesAPI(data),
          ]);
          const favoriteResults = favoriteData.results.map((movie) => {
            const matchedDataMovie = data.find(
              (dataMovie) => dataMovie.movieId === movie.id
            );
            return matchedDataMovie ? { ...movie, _id: matchedDataMovie._id } : movie;
          });
          const watchedResults = watchedData.results.map((movie) => {
            const matchedDataMovie = data.find(
              (dataMovie) => dataMovie.movieId === movie.id
            );
            return matchedDataMovie ? { ...movie, _id: matchedDataMovie._id } : movie;
          });
          const wishlistedResults = wishlistedData.results.map((movie) => {
            const matchedDataMovie = data.find(
              (dataMovie) => dataMovie.movieId === movie.id
            );
            return matchedDataMovie ? { ...movie, _id: matchedDataMovie._id } : movie;
          });
          dispatch(setFavoriteMovies(favoriteResults));
          dispatch(setWatchedMovies(watchedResults));
          dispatch(setwishlistedMovies(wishlistedResults));
        } else {
          console.error("Failed to get movies:", response ? response.status : "Unknown");
        }
      } catch (error) {
        console.error("Error while getting movies:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (deletedCardId) {
      setFilteredMovies((prevFilteredMovies) =>
        prevFilteredMovies.filter((movie) => movie._id !== deletedCardId)
      );
    }
  }, [deletedCardId]);

  return (
    <div>
      <h1>Favorite Cards</h1>
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
                <CardActionsComponent cardId={movie.id} />
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
    </div>
  );
};

export default MyMovies;
