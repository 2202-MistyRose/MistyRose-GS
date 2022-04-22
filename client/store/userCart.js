import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  status: null,
  error: null
}

// tough here bc how do we get the cart items for ONE user?
// we would need a route that included the userId to find the active order Id associated to them?
export const fetchCart = createAsyncThunk('cart/fetchCart',
  async () => {
    try {
      const {data} = await axios.get('/api/cart');
      return data
    } catch(err) {
      console.log(err)
    }
  }
)

// createSlice
