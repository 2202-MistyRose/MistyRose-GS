import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import { me } from "./store/auth.slice";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";
/**
 * COMPONENT
 */

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/users/:userId/cart" component={Cart} />
        <Route path="/users/:userId/checkout" component={Checkout} />
        <Route path="/login">{Login}</Route>
        <Route path="/signup">{Signup}</Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Routes;
