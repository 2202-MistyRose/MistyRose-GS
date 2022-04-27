import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../history';
import { authenticate, me, register } from '../store/auth.slice';

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleLogin = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, formName }));
    history.push('/');
  };

  const handleSignup = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    dispatch(register({ username, password, email, formName }));
    history.push('/');
  };

  return (
    <div>
      {displayName === 'Sign Up' ? (
        <Grid
          container
          spacing={3}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <form onSubmit={handleSignup} name={name}>
            <Grid item xs={12}>
              <div>
                <label htmlFor="username">
                  <small>Username</small>
                </label>
                <input name="username" type="text" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="email" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <button type="submit">{displayName}</button>
              </div>
            </Grid>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <form onSubmit={handleLogin} name={name}>
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input name="username" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Grid>
      )}
    </div>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
