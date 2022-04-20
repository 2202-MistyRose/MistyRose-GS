import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const NEW_USER = 'NEW_USER';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const newUser = (user) => ({ type: NEW_USER, user });

/**
 * THUNK CREATORS
 */
// THUNK that creates a new user
export const newUserThunk = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', user);
    dispatch(newUser(data));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
