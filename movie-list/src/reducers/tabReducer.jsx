import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const tabReducer = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = tabReducer.actions;
export default tabReducer.reducer;

