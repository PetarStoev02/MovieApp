import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../../reducers/tabReducer";
import { Link } from "react-router-dom";

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
          <Tab
            label="Movie List"
            component={Link}
            to="/"
            {...a11yProps(0)}
          />
          <Tab
            label="My Movies"
            component={Link}
            to="/collection"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
