import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticate, reset, me } from "../store/auth.slice.js";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userInfo;
  const { user, success, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (success || user) {
      // redirect to home page
      history.push("/home");
    }
    dispatch(reset());
  }, [user, success, error]);

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(authenticate(userData));
  };

  const handleChange = (e) => {
    // Removes sythentic event error
    e.persist();
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
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

export default Login;
