import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import {productsReducer} from './allProducts';
import { singleProductReducer } from './singleProduct';

const reducer = {
  auth: authReducer,
  products: productsReducer,
  product: singleProductReducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
