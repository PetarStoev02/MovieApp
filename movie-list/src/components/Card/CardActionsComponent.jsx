import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
  toggleReplyAsync
} from "../../reducers/cardReducer";

export default function CardActionsComponent({ cardId }) {
  const [isFavoriteClicked, setFavoriteClicked] = useState(false);
  const [isBookmarkClicked, setBookmarkClicked] = useState(false);
  const [isReplyClicked, setReplyClicked] = useState(false);

  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    setFavoriteClicked(!isFavoriteClicked);
    dispatch(toggleFavorite(cardId));
    dispatch(toggleFavoriteAsync(cardId));
  };

  const handleBookmarkClick = () => {
    setBookmarkClicked(!isBookmarkClicked);
    dispatch(toggleBookmark(cardId));
    dispatch(toggleBookmarkAsync(cardId));
  };

  const handleReplyClick = () => {
    setReplyClicked(!isReplyClicked);
    dispatch(toggleReply(cardId));
    dispatch(toggleReplyAsync(cardId));
    
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
