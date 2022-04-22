import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { logout } from "../store/auth.slice";
import { styled } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(-5),
  },
  title: {
    flexGrow: 2,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img
              style={{
                height: "2.5em",
                width: "1.8em",

                marginLeft: "2em",
                marginRight: "13em",
              }}
              src="/images/pearpng.png"
            />
          </Link>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/products"
              style={
                {
                  // textDecoration: 'none',
                  // color: 'white',
                  // marginLeft: '-2em',
                }
              }
            >
              Store
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Phones</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Mac
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Accessories
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          {success ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/products">Products</Link>
              <a href="#" onClick={() => dispatch(logout())}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
