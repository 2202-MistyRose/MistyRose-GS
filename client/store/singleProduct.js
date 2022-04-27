import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  status: null,
  error: null,
};

export const getSingleProduct = createAsyncThunk(
  "product/getProduct",
  async (id) => {
    try {
<<<<<<< HEAD
      const {data} = await axios.get(`/api/products/${id}`);
      return data
=======
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
>>>>>>> c506dcf632bdaacd61219ae3a1a3b8ced4b04fd5
    } catch (err) {
      console.log(err);
    }
  }
);

export const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.status = "loading";
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const singleProductReducer = singleProductSlice.reducer;
