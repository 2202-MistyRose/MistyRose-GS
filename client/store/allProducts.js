import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      console.log("in thunk");
      const res = await axios.get("/api/products");
      console.log("data is", res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
  },
  reducers: {},
  // only handle action types
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.status = "success";
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const productsReducer = productsSlice.reducer;
