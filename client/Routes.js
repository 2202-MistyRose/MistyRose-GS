import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Hero from "./components/Hero";
import { me } from "./store/auth.slice";
import { Login, Signup } from "./components/AuthForm";
import AllProducts from "./components/Products/AllProducts";
import Cart from "./components/Cart";
import SingleProduct from "./components/Products/SingleProduct";
import Checkout from "./components/Checkout";
import AdminView from "./components/AdminDash/AdminView";
import Profile from "./components/CustomerProfile/Profile";
import Phones from "./components/Products/Phones";
import Mac from "./components/Products/Mac";

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
        <Route path="/phones" component={Phones} />
        <Route path="/mac" component={Mac} />
        <Route path="/admin" component={AdminView} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Routes;
