import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  status: null,
  error: null
}

export const fetchCart = createAsyncThunk('cart/fetchCart',
  async (id) => {
    try {
      // added token and headers to request
      const token = window.localStorage.getItem("token");
      const {data} = await axios.get(`/api/users/${id}/cart`, {
        headers: {
          authorization: token
        }
      });
      return data
    } catch(err) {
      console.log(err)
    }
  }
)

export const addToCart = createAsyncThunk('cart/addToCart',
  async (id) => {
    try {
      const {product, user} = id;
      const prodId = product.id;
      const userId = user.id;
      const {data: created} = await axios.post(`/api/products`, {prodId, userId})
      return created
    } catch(err) {
      console.log(err)
    }
  }
)

export const removeFromCart = createAsyncThunk('/cart/removeFromCart',
  async (itemObj) => {
    try {
      const {item, userId} = itemObj;
      const {data: deleted} = await axios.delete(`/api/users/${userId}/cart`, {data: {
        item: item
      }})
      return deleted
    } catch(err) {
      console.log(err)
    }
  }
)

export const updateQuantity = createAsyncThunk('/cart/increment',
  async (itemObj) => {
    try {
      const {item, userId} = itemObj;
      const {data: updated} = await axios.put(`/api/users/${userId}/cart`, item);
      return updated
    } catch (err) {
      console.log(err)
    }
  }
)

export const clearCart = createAsyncThunk('cart/increment',
  async (userId) => {
    try {
      const {data: deleted} = await axios.delete(`/api/users/${userId}/cart`);
      return deleted
    } catch (err) {
      console.log(err)
    }
  }
)

export const checkout = createAsyncThunk('cart/checkout',
  async (info) => {
    try {
      // pass in the cart to get items instead of searching backend
      const {userId, cart} = info;
      console.log('checkout')
      const {data: updated} = await axios.post(`/api/users/${userId}/checkout`, cart)
      return updated
    } catch(err) {
      console.log(err)
    }
  }
)

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
    },
    [addToCart.pending]: (state) => {
      state.status = 'loading';
    },
    [addToCart.fulfilled]: (state, action) => {
      state.cart.push(action.payload);
      state.status = 'success';
    },
    [addToCart.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [removeFromCart.pending]: (state) => {
      state.status = 'loading';
    },
    [removeFromCart.fulfilled]: (state, action) => {
      // console.log('action is:', action.meta.arg)
      // state.cart = state.cart.filter(item => item.productId !== action.payload.productId)
      state.cart = state.cart.filter(item => item.productId != action.meta.arg.item.productId)
      state.status = 'success';
    },
    [removeFromCart.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [updateQuantity.pending]: (state) => {
      state.status = 'loading';
    },
    [updateQuantity.fulfilled]: (state, action) => {
      console.log('action payload is', action)
      // state.cart = action.payload;
      state.cart = state.cart.reduce((accum, current) => {
        if (current.productId === action.meta.arg.item.productId) {
          if (action.meta.arg.item.quantity > 0) { // if it becomes 0 don't return it
            accum.push(action.meta.arg.item)
          }
        } else {
          accum.push(current)
        }
        return accum
      }, [])
      state.status = 'success';
    },
    [updateQuantity.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [clearCart.pending]: (state) => {
      state.status = 'loading';
    },
    [clearCart.fulfilled]: (state, action) => {
      state.cart = [];
      state.status = 'success';
    },
    [clearCart.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [checkout.pending]: (state) => {
      state.status = 'loading';
    },
    [checkout.fulfilled]: (state, action) => {
      state.cart = [];
      state.status = 'success';
    },
    [checkout.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
})

export const cartReducer = cartSlice.reducer;
