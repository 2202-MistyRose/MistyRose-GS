import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div>
      <h3>Welcome, {user}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default Home;
