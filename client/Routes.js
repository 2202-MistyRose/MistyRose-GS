import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import { me } from './store/auth.slice';
import AllProducts from './components/AllProducts';

import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
/**
 * COMPONENT
 */

function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(me());
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/products" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default Routes;
