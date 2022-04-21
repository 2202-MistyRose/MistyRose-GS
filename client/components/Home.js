import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h3>Welcome, {user.username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */

export default Home;
