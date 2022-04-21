import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct';

/**
 * COMPONENT
 */

function Routes() {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // useEffect(() => dispatch(me()), []);
  return (
    <div>
      {/* {success ? ( */}
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Redirect to="/home" />
        </Switch>
      </div>

);
}

export default Routes;

 {/* ) : (
         <Switch>
           <Route path="/" exact component={AuthForm} />
           <Route path="/login" component={AuthForm} />
           <Route path="/signup" component={AuthForm} />
         </Switch>
       )}
    </div> */}
