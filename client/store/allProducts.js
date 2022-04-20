import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk(
  'products/getProducts', async () => {
    try {
      const {data: prods} = await axios.get('/api/products')
      return prods;
    } catch (err) {
        console.log(err)
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    value: [],
    status: null
  },
  reducers: {},
  extraReducer: {
    [getProducts.pending]: (state) => {
      state.status = 'loading'
    },
    [getProducts.fulfilled]: (state, {payload}) => {
      state.value = payload;
      state.status = 'success';
    },
    [getProducts.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
})

export default productsSlice.reducer;

// need to configure store with this reducer in the index
