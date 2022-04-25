import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth.slice";
import { productsReducer } from "./allProducts";
import { singleProductReducer } from "./singleProduct";
import { cartReducer } from "./userCart";
import { usersReducer } from "./users.slice";
import { userReducer } from "./singleUser.slice";

const reducer = {
  auth: authReducer,
  products: productsReducer,
  product: singleProductReducer,
  cart: cartReducer,
  users: usersReducer,
  user: userReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
