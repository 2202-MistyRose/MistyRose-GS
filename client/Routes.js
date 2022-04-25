import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { me } from "./store/auth.slice";
import { Login, Signup } from "./components/AuthForm";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";
import AdminView from "./components/AdminDash/AdminView";
import Profile from "./components/CustomerProfile/Profile";
import Hero from "./components/Hero";

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
        <Route path="/home" component={Hero} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/users/:userId/cart" component={Cart} />
        <Route path="/users/:userId/checkout" component={Checkout} />
        <Route path="/login">{Login}</Route>
        <Route path="/signup">{Signup}</Route>
        <Route path="/newhome" exact component={Hero} />
        <Route path="/admin" component={AdminView} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Routes;
