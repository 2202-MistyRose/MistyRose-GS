import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getSingleProduct = createAsyncThunk('product/getProduct', async (id) => {
    const {data} = await axios.get(`/api/products/${id}`);
    return data
  })

export const singleProductSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    status: null
  },
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.status = 'loading'
    },
    [getSingleProduct.fulfilled]: (state, {payload}) => {
      state.value = payload;
      state.status = 'success';
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
})

const singleProductReducer = singleProductSlice.reducer;

export default singleProductReducer;

// No need to return dispatch function, just data
