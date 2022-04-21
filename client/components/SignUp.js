import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { register, reset } from "../store/auth.slice.js";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userInfo;
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
          <label htmlFor="email">
            <small>Email</small>
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
          <button type="submit">Sign up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

export default SignUp;
