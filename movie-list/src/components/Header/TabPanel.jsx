import * as React from "react";
import PropTypes from "prop-types";
import Cards from "../Card/Cards";
import MyMovies from "../FavoriteCards/MyMovies"
import Filter from "../FilterMenu/Filter";
import { Tabs, Tab, Typography, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../../reducers/tabReducer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const value = useSelector((state) => state.tab.value);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setValue(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Movie List" {...a11yProps(0)} />
          <Tab label="My Movies" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Cards />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Filter />
        < MyMovies />
      </TabPanel>
    </Box>
  );
}
