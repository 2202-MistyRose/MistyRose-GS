import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { logout } from "../store/auth.slice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#1d1d1f",
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

  const { user, success } = useSelector((state) => state.auth);
  console.log("this is", user);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="static">
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
          <Typography variant="h6" className={classes.title}>
            <Link to="/products">Store</Link>
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
          {user ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to={user.userRole === "Admin" ? "/admin" : "/profile"}>
                Profile
              </Link>
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
