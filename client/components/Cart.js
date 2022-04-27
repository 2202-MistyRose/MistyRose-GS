import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  checkout,
} from '../store/userCart';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import CartItem from './CartItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
// import { use } from "chai";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  function remove(item) {
    dispatch(removeFromCart({ item, userId }));
  }

  function increment(item) {
    item = { ...item, quantity: item.quantity + 1 };
    dispatch(updateQuantity({ item, userId }));
  }

  function decrement(item) {
    item = { ...item, quantity: item.quantity - 1 };
    dispatch(updateQuantity({ item, userId }));
  }

  // there may be a better method than this lol
  const totalPrice =
    cart.length === 0
      ? 0
      : cart.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);

  return (
    <div className="cart">
      {/* <h1>Cart</h1> */}
      {/* <Typography align="center" variant="h3" style={{margin: '30px'}}>
        Cart
      </Typography> */}
      {cart.length ? (
        <Typography align="center" variant="h3" style={{ margin: '30px' }}>
          Cart
        </Typography>
      ) : (
        <Typography align="center" variant="h3" style={{ margin: '30px' }}>
          {' '}
          Your cart is empty!
        </Typography>
      )}
      {cart.map((item) => {
        return (
          <CartItem
            key={item.id}
            {...item}
            increment={() => increment(item)}
            decrement={() => decrement(item)}
            remove={() => remove(item, userId)}
          />
          // <div key={item.product.id}>
          //   <img src={item.product.imageUrl} />
          //   <p>{item.product.name}</p>
          //   <div>
          //     {item.quantity > 1 ? (
          //       <button onClick={() => decrement(item)}>-</button>
          //     ) : null}
          //     <span> quantity: {item.quantity} </span>
          //     <button onClick={() => increment(item)}>+</button>
          //   </div>
          //   <button onClick={() => dispatch(removeFromCart({ item, userId }))}>
          //     Remove Item
          //   </button>
          // </div>
        );
      })}
      {/* <Button onClick={() => dispatch(clearCart(userId))}>Clear Cart</Button> */}
      {/* <Typography style={{margin: '15px'}} align="center">Subtotal: ${totalPrice === 0 ? 0 : totalPrice / 100}.00</Typography> */}

      {cart.length ? (
        <React.Fragment>
          <Typography style={{ margin: '15px' }} align="center">
            Subtotal: ${totalPrice === 0 ? 0 : totalPrice / 100}.00
          </Typography>

          <Box textAlign="right">
            <Button
              align="left"
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(clearCart(userId))}
              style={{ marginRight: '15px' }}
            >
              Clear Cart
            </Button>
            <Link to={`/users/${userId}/checkout`}>
              <Button
                startIcon={<ArrowRightAltIcon />}
                color="primary"
                variant="contained"
              >
                Checkout
              </Button>
            </Link>
          </Box>
        </React.Fragment>
      ) : null}

      {/* <Link to={`/users/${userId}/checkout`}>
        {cart.length ?
        <div>
        <Typography style={{margin: '15px'}} align="center">Subtotal: ${totalPrice === 0 ? 0 : totalPrice / 100}.00</Typography>
        <Box textAlign="right">
          <Button align="left" variant="outlined" color="secondary" onClick={() => dispatch(clearCart(userId))} style={{marginRight: '15px'}}>Clear Cart</Button>
          <Button startIcon={<ArrowRightAltIcon />} color="primary" variant="contained">Checkout</Button>
        </Box> </div>: null}
      </Link> */}
    </div>
  );
}

// can i just link the checkout in an a tag? want to pass down the total as a prop to make things earier
