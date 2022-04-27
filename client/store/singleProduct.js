import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  product: {},
  status: null,
  error: null
}

export const getSingleProduct = createAsyncThunk('product/getProduct', async (id) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`);
      return data
    } catch (err) {
      console.log(err)
    }
  })

  export const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.status = 'loading'
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'success';
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload
    }
  }
})

export const singleProductReducer = singleProductSlice.reducer;
