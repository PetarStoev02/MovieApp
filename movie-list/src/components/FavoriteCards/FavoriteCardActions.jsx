import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReplyIcon from "@mui/icons-material/Reply";
import CardActions from "@mui/material/CardActions";
import {
  toggleFavorite,
  toggleBookmark,
  toggleReply,
  toggleFavoriteAsync,
  toggleBookmarkAsync,
  toggleReplyAsync,
  togglePatchAsync,
} from "../../reducers/cardReducer";

export default function FavoriteCardActionsComponent({
  cardId,
  movieId,
  listType,
}) {
  const [isFavoriteClicked, setFavoriteClicked] = useState(
    listType === "favorite"
  );
  const [isBookmarkClicked, setBookmarkClicked] = useState(
    listType === "watched"
  );
  const [isReplyClicked, setReplyClicked] = useState(listType === "wishlisted");

  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    setFavoriteClicked(!isFavoriteClicked);
    setBookmarkClicked(false);
    setReplyClicked(false);
    dispatch(togglePatchAsync(cardId, movieId, "favorites"));
    window.location.reload();
  };

  const handleBookmarkClick = () => {
    setBookmarkClicked(!isBookmarkClicked);
    setReplyClicked(false);
    setFavoriteClicked(false);
    dispatch(togglePatchAsync(cardId, movieId, "watched"));
    window.location.reload();
  };

  const handleReplyClick = () => {
    setReplyClicked(!isReplyClicked);
    setFavoriteClicked(false);
    setBookmarkClicked(false);
    dispatch(togglePatchAsync(cardId, movieId, "wishlist"));
    window.location.reload();
  };

  return (
    <CardActions
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        size="small"
        onClick={handleFavoriteClick}
        sx={{
          "&:hover": {
            color: isFavoriteClicked ? "inherit" : "green",
          },
          color: isFavoriteClicked ? "green" : "inherit",
        }}
      >
        <FavoriteIcon />
      </Button>
      <Button
        size="small"
        onClick={handleBookmarkClick}
        sx={{
          "&:hover": {
            color: isBookmarkClicked ? "inherit" : "green",
          },
          color: isBookmarkClicked ? "green" : "inherit",
        }}
      >
        <BookmarkIcon />
      </Button>
      <Button
        size="small"
        onClick={handleReplyClick}
        sx={{
          "&:hover": {
            color: isReplyClicked ? "inherit" : "green",
          },
          color: isReplyClicked ? "green" : "inherit",
        }}
      >
        <ReplyIcon />
      </Button>
    </CardActions>
  );
}
