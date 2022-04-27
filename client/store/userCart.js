import { CodeSharp } from "@material-ui/icons";
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
      const token = window.localStorage.getItem("token")
      // console.log('token', token)
      // guest?
      if (!token) {
        // let cart = window.localStorage.getItem("cart")
        let {product} = id
        let cart = window.localStorage.getItem("cart")
        if (!cart) {
          let arr = [product]
          window.localStorage.setItem("cart", JSON.stringify(arr))
        } else {
          console.log(cart)
          let arr = JSON.parse(cart)
          arr.push(product)
          window.localStorage.setItem("cart", JSON.stringify(arr))
        }
      } else {
      const {product, user} = id;
      const prodId = product.id;
      const userId = user.id;
      // const {data: created} = await axios.post(`/api/products`, {prodId, userId})
      const {data: created} = await axios.post(`/api/products`, {
        prodId,
        userId,}, {
        headers: {
          authorization: token
        }
      })
      return created
    }
    } catch(err) {
      console.log(err)
    }
  }
)

export const removeFromCart = createAsyncThunk('/cart/removeFromCart',
  async (itemObj) => {
    try {
      const token = window.localStorage.getItem("token")
      const {item, userId} = itemObj;
      // const {data: deleted} = await axios.delete(`/api/users/${userId}/cart`, {
      //   headers: {
      //     authorization: token
      //   }
      // },
      // {data: {
      //   item: item
      // }}
      // )
      const {data: deleted} = await axios.delete(`/api/users/${userId}/cart`,
      {data: {
        item: item
      }}
      )
      return deleted
    } catch(err) {
      console.log(err)
    }
  }
)

export const updateQuantity = createAsyncThunk('/cart/increment',
  async (itemObj) => {
    try {
      const token = window.localStorage.getItem("token");
      const {item, userId} = itemObj;
      const {data: updated} = await axios.put(`/api/users/${userId}/cart`, item, {
        headers: {
          authorization: token
        }
      });
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
      const {userId, cart} = info;
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
