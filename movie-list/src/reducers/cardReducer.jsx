import { createSlice } from "@reduxjs/toolkit";
import { postMovies, deleteMovies, patchMovies } from "../api/serverAPI";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  cards: {},
  selectedButtons: {},
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const cardId = action.payload;
      const isSelected = state.selectedButtons.favorite === cardId;

      state.selectedButtons.favorite = isSelected ? null : cardId;

      if (isSelected) {
        // Save the card if isSelected is true
        delete state.cards[cardId];
      } else {
        // Remove the card if isSelected is false
        state.cards[cardId] = action.payload;
      }
    },

    toggleBookmark: (state, action) => {
      const cardId = action.payload;
      const isSelected = state.selectedButtons.bookmark === cardId;

      state.selectedButtons.bookmark = isSelected ? null : cardId;
    },
    toggleReply: (state, action) => {
      const cardId = action.payload;
      const isSelected = state.selectedButtons.reply === cardId;

      state.selectedButtons.reply = isSelected ? null : cardId;
    },
  },
});

export const {
  toggleFavorite,
  toggleBookmark,
  toggleReply,
} = cardSlice.actions;

export const toggleFavoriteAsync = (cardId) => async (dispatch) => {
  try {
    const data = {
      owner: "petar",
      movieId: cardId,
      list: "favorites",
    };

    await postMovies(data);

    dispatch(toggleFavorite(cardId));
  } catch (error) {
    // Handle error
  }
};

export const toggleBookmarkAsync = (cardId) => async (dispatch) => {
  try {
    const data = {
      owner: "petar",
      movieId: cardId,
      list: "watched",
    };

    await postMovies(data);

    dispatch(toggleBookmark(cardId));
  } catch (error) {
    // Handle error
  }
};

export const toggleReplyAsync = (cardId) => async (dispatch) => {
  try {
    const data = {
      owner: "petar",
      movieId: cardId,
      list: "wishlist",
    };

    await postMovies(data);

    dispatch(toggleReply(cardId));
  } catch (error) {
    // Handle error
  }
};

export const toggleDeleteAsync = (cardId) => async (dispatch) => {
  // // const filteredMovies = useSelector((state) => state.filteredMovies);
  // console.log(filteredMovies)
  try {
    const data = {
      id: cardId,
    };

    await deleteMovies(cardId);
    dispatch(deleteMovie(cardId));
  } catch (error) {
    // Handle error
  }
};

export const togglePatchAsync = (cardId, movieId, listType) => async (dispatch) => {
  try {
    const data = {
      _id: cardId,
      owner: "petar",
      movieId: movieId,
      list: [listType],
    };

    await patchMovies(data);
  } catch (error) {
    // Handle error
  }
};


export default cardSlice.reducer;
