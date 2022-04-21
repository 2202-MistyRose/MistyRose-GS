import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

<<<<<<< HEAD
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
=======
const initialState = {
  product: {},
  status: null,
  error: null
}

export const getSingleProduct = createAsyncThunk('product/getProduct', async (id) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`);
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  })

  export const singleProductSlice = createSlice({
  name: 'product',
  initialState,
>>>>>>> c565621e83830ea66f3ca588393c991a43f0b006
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.status = 'loading'
    },
<<<<<<< HEAD
    [getSingleProduct.fulfilled]: (state, {payload}) => {
      state.value = payload;
      state.status = 'success';
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.status = 'failed';
=======
    [getSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'success';
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload
>>>>>>> c565621e83830ea66f3ca588393c991a43f0b006
    }
  }
})

<<<<<<< HEAD
const singleProductReducer = singleProductSlice.reducer;

export default singleProductReducer;

// No need to return dispatch function, just data
=======
// const singleProductReducer = singleProductSlice.reducer;
// export default singleProductReducer;

export const singleProductReducer = singleProductSlice.reducer;
>>>>>>> c565621e83830ea66f3ca588393c991a43f0b006
