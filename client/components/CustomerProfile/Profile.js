import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h3>This is your profile page, {user.username}</h3>
    </div>
  );
};

export default Profile;
