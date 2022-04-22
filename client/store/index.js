import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import {productsReducer} from './allProducts';
import { singleProductReducer } from './singleProduct';
import { cartReducer } from './userCart';

const reducer = {
  auth: authReducer,
  products: productsReducer,
  product: singleProductReducer,
  cart: cartReducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
