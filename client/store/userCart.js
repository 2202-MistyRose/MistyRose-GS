import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  status: null,
  error: null
}

// getting all of the products
// take in ID for user?
export const fetchCart = createAsyncThunk('cart/fetchCart',
  async (id) => {
    try {
      const {data} = await axios.get(`/api/users/{${id}/cart`);
      return data
    } catch(err) {
      console.log(err)
    }
  }
)

// honestly don't know toolkit well, not sure if there will be well written, this communicates with express post request
// export const addToCart = createAsyncThunk('cart/addToCart',
//   async (item) => {
//     try {
//       const {data: created} = await axios.post('/api/users/:userId/cart', item)
//       return created // ???????
//     } catch(err) {
//       console.log(err)
//     }
//   }
// )

// export const removeFromCart = createAsyncThunk('/cart/addToCart',
//   async (item) => {
//     try {
//       const {data: deleted} = await axios.delete('/api/users/:userId/cart', item)
//       return deleted // ?????
//     } catch(err) {
//       console.log(err)
//     }
//   }
// )

// should there be separate increment and decrement functions? or should there just be an update that takes in the updated item?

// export const changeQuantity = createAsyncThunk('cart/changeQuantity',
//   async (item) => {
//     try {
//       const {data: updated} = await axios.post('/api/users/:userId/cart', item)
//       return updated
//     } catch (err) {
//       console.log(err)
//     }
//   }
// )

// createSlice

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
      state.status = 'success';
    },
    [fetchCart.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
})

export const cartReducer = cartSlice.reducer;
