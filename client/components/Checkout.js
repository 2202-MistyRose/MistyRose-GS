import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { checkout, fetchCart } from '../store/userCart';
import Typography from "@material-ui/core/Typography";

export default function Checkout(props) {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart(userId))
  }, [])

  const totalPrice =
    cart.length === 0
      ? 0
      : cart.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);

  if (cart.length === 0) {
    return (
      <Typography align='center' variant='h3'>
        You have no items to checkout!
      </Typography>
    )
  }

  return (
    <div>
      <div>Checkout</div>
      <div>Your total is: ${totalPrice}</div>
      <Button onClick={() => dispatch(checkout({userId, cart}))}>Make Purchase</Button>
      <Link to={`/users/${userId}/cart`}>Back to Cart</Link>
    </div>
  )
}
