import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TOKEN = "token";
const user = JSON.parse(localStorage.getItem("user"));
// create initial state (redux toolkit needs a success, error, and loading state)
const initialState = {
  user: user ? user : null,
  success: false,
  error: false,
  loading: false,
};

// create thunk
export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/users", user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await window.localStorage.removeItem(TOKEN);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    [register.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.user = null;
    },
    [me.fulfilled]: (state, action) => {
      state.user = action.payload;
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
      state.user = null;
    },
  },
});

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
