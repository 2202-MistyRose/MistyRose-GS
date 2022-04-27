import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formInfo, { rejectWithValue }) => {
    console.log(formInfo);
    try {
      const res = await axios.post("/api/products/admin", formInfo);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (formInfo, { rejectWithValue }) => {
    try {
      const { formData, product } = formInfo;
      const { id } = product;
      const res = await axios.put(`/api/products/${id}`, formData);
      return res.data;
    } catch (error) {
      console.log("Can't update this product", error);
      return rejectWithValue(error);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      return res.data;
    } catch (error) {
      console.log("Can't delete this product", error);
      return rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // only handle action types
  extraReducers: {
    [productsFetch.pending]: (state) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [createProduct.pending]: (state) => {
      state.status = "pending";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.status = "success";
      state.products.push(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "error";
    },
    [updateProduct.pending]: (state) => {
      state.status = "pending";
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = {
        ...state.products[index],
        ...action.payload,
      };
    },
    [updateProduct.rejected]: (state) => {
      state.error = "error";
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const productsReducer = productsSlice.reducer;
