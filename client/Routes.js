import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";

/**
 * COMPONENT
 */

function Routes() {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      {success ? (
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
        </Switch>
      )}
    </div>
  );
}

export default Routes;
