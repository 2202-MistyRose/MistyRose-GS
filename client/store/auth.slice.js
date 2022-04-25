import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";

const TOKEN = "token";
// create initial state (redux toolkit needs a success, error, and loading state)
const initialState = {
  user: {},
  success: false,
  error: false,
  loading: false,
};

// create thunk

export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (formInfo, { dispatch, rejectWithValue }) => {
    try {
      const { username, password, email, formName } = formInfo;
      const res = await axios.post(`/auth/${formName}`, {
        username,
        password,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (formInfo, { dispatch, rejectWithValue }) => {
    try {
      const { username, password, formName } = formInfo;
      const res = await axios.post(`/auth/${formName}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
});

// Slice reducer - action creators and types are generated here
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [me.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.rejected]: (state) => {
      state.error = true;
    },
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
      state.success = false;
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
