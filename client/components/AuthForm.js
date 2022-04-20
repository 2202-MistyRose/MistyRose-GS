import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { register } from '../store/auth.slice.js';
// import { authenticate, newUserThunk } from '../store';

/**
 * COMPONENT
 */

const AuthForm = () => {
  // const { name, displayName, email, handleSubmit, error } = props;
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = userInfo;
  const { user, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    // if (success) {
    // }
  }, [user, success, error]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    dispatch(register(userData));
  };

  const handleChange = (e) => {
    setUserInfo((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email">
            <small>email</small>
          </label>
          <input name="email" type="text" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">{name}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};
export default AuthForm;

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error,
//   };
// };

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error,
//   };
// };
// // if (formName === 'Sign Up') {
// //   const email = evt.target.email.value;
// //   dispatch(newUserThunk({ username, password, email }));
// // }
// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       dispatch(authenticate(username, password, formName));
//     },
//   };
// };

// const mapDispatchSignUp = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       const email = evt.target.email.value;
//       dispatch(newUserThunk(username, password, email));
//     },
//   };
// };

// export const Login = connect(mapLogin, mapDispatch)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthForm);
