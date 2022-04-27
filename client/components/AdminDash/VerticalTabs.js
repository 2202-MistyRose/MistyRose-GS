import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Orders from "./Products/Orders";
import CustomerList from "./Customers/CustomerList";
import ProductList from "./Products/ProductList";
import Chart from "./Chart";
import { Grid, Paper, Box, Typography, Tabs, Tab } from "@material-ui/core";
import AddProduct from "./Products/AddProduct";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
  tabs: {
    minWidth: 180,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
        <Tab label="Products" {...a11yProps(2)} />
        <Tab label="Add Products" {...a11yProps(3)} />
        <Tab label="Order History" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid item>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomerList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddProduct />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Orders />
      </TabPanel>
    </div>
  );
}
