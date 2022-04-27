import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3>This is your profile page, {user.username}</h3>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
