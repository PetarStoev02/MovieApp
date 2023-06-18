import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { setFilter } from '../../reducers/filterReducer';

export default function SelectVariants() {
  const filterType = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filterType}
          onChange={handleChange}
          label="filterType"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>Watched</MenuItem>
          <MenuItem value={20}>Favorites</MenuItem>
          <MenuItem value={30}>WishList</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
