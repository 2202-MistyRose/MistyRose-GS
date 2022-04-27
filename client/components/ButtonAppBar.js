import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth.slice';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#1d1d1f',
  },
  // love this stuff
  menuButton: {
    marginRight: theme.spacing(-5),
  },
  title: {
    flexGrow: 2,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Link to="/">
            <img
              style={{
                height: '2.5em',
                width: '1.8em',

                marginLeft: '2em',
                marginRight: '13em',
              }}
              src="/images/pearpng.png"
            />
          </Link>
          <Typography variant="h5" className={classes.title}>
            <Link to="/products">Store</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/phones">Phones</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/mac">Mac</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/accessories">Accessories</Link>
          </Typography>
          {user ? (
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <Link to={user.userRole === 'Admin' ? '/admin' : '/profile'}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </Link>
                </Grid>
                <Grid item xs={6} md={4}>
                  <a href="#" onClick={() => dispatch(logout())}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                  </a>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Link to={`/users/${user.id}/cart`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </Link>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid container spacing={8}>
                <Grid item xs={6} md={4}>
                  <Link to="/login">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                      </g>
                      <g>
                        <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                      </g>
                    </svg>
                  </Link>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Link to="/signup">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </Link>
                </Grid>
              </Grid>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
