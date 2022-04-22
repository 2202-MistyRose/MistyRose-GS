import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import { me } from "./store/auth.slice";

/**
 * COMPONENT
 */

const Routes = () => {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

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
          <Route path="/" exact>
            {Login}
          </Route>
          <Route path="/login">{Login}</Route>
          <Route path="/signup">{Signup}</Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
