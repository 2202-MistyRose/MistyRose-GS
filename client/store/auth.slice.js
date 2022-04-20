import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const TOKEN = 'token';
const user = JSON.parse(localStorage.getItem('user'));
// create initial state (redux toolkit needs a success, error, and loading state)
const initialState = {
  user: user ? user : null,
  success: false,
  error: false,
  loading: false,
};

// create thunk
export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', user);
      return data;
    } catch (err) {
      return rejectWithValue(error);
    }
  }
);

export const me = createAsyncThunk('auth/me', async () => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (username, password, method) =>
    async ({ dispatch, rejectWithValue }) => {
      try {
        const res = await axios.post(`/auth/${method}`, {
          username,
          password,
        });
        window.localStorage.setItem(TOKEN, res.data.token);
        dispatch(me());
      } catch (authError) {
        return rejectWithValue(authError);
      }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await window.localStorage.removeItem(TOKEN);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [authenticate.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    [authenticate.pending]: (state) => {
      state.loading = true;
    },
    [authenticate.rejected]: (state) => {
      state.error = true;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
