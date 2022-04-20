import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import productsReducer from './allProducts';

const reducer = {
  auth: authReducer,
  products: productsReducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
