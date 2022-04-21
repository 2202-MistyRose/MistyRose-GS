import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { me } from "./store/auth.slice";
import AllProducts from "./components/AllProducts";

/**
 * COMPONENT
 */

function Routes() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {user ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/products" component={AllProducts} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/products" component={AllProducts} />
        </Switch>
      )}
    </div>
  );
}

export default Routes;
