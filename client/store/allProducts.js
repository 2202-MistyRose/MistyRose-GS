import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk(
  'products/getProducts', async () => {
    try {
      console.log('in thunk')
      const res = await axios.get('/api/products')
      console.log('data is', res.data)
      return res.data;
    } catch (err) {
        console.log(err)
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: null
  },
  reducers: {},
  extraReducer: {
    [getProducts.pending]: (state) => {
      state.status = 'loading'
    },
    [getProducts.fulfilled]: (state, {payload}) => {
      state.products = payload;
      state.status = 'success';
    },
    [getProducts.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
})

const productsReducer = productsSlice.reducer;

export default productsReducer;

// const SET_PRODUCTS = "SET_PRODUCTS";

// const setProducts = (products) => ({type: SET_PRODUCTS, products})

// export const fetchProducts = () => {
//   return async (dispatch) => {
//     const {data: prods} = await axios.get('/api/products');
//     dispatch(setProducts(prods))
//   }
// }

// export default function(state = [], action) {
//   switch(action.type) {
//     case SET_PRODUCTS:
//       return [...action.products]
//     default:
//       return state
//   }
// }
