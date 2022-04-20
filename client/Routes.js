import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';

/**
 * COMPONENT
 */

function Routes() {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // useEffect(() => dispatch(me()), []);
  return (
    <div>
      {success ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={AuthForm} />
          <Route path="/login" component={AuthForm} />
          <Route path="/signup" component={AuthForm} />
        </Switch>
      )}
    </div>
  );
}

export default Routes;
