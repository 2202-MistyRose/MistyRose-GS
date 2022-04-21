// import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
// import AuthForm from './components/AuthForm';
// import Home from './components/Home';
// import { me } from './store';
// import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct';

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
          <Route exact path="/home" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
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
