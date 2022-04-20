import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div>
      <h3>Welcome, {user}</h3>
    </div>
  );
};

export default Home;
