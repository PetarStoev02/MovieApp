import React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setSearchQuery } from "../../reducers/searchReducer"; // Import the setSearchQuery action

export default function SearchBar() {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "50%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        sx={{
          backgroundColor: "white", 
        }}
        onChange={handleSearchChange}
      />
    </Box>
  );
}
