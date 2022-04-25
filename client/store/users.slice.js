import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  users: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

// Async thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/users");
      return res.data;
    } catch (error) {
      console.log("Can't find users", error);
      return rejectWithValue(error);
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/users/${id}`);
      return res.data;
    } catch (error) {
      console.log("Can't delete this user", error);
      return rejectWithValue(error);
    }
  }
);

// Slice reducer - action creators and types are generated here
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isSuccess = true;
    },
    [fetchUsers.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [removeUser.fulfilled]: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const usersReducer = usersSlice.reducer;
