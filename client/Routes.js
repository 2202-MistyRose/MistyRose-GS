import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Hero from "./components/Hero";
import { me } from "./store/auth.slice";
import { Login, Signup } from "./components/AuthForm";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";
import AdminView from "./components/AdminDash/AdminView";
import Profile from "./components/CustomerProfile/Profile";

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
<<<<<<< HEAD
        <Route path="/home" component={Home} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct}/>
=======
        <Route path="/home" component={Hero} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
>>>>>>> 96a1e04e3c428f9b7ead0b4b502e86f2a2242d45
        <Route path="/users/:userId/cart" component={Cart} />
        <Route path="/users/:userId/checkout" component={Checkout} />
        <Route path="/login">{Login}</Route>
        <Route path="/signup">{Signup}</Route>
        {/* <Route path="/newhome" exact component={Hero} /> */}
        <Route path="/admin" component={AdminView} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Routes;
