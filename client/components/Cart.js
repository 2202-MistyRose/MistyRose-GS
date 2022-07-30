import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/userCart";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

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

  return (
    <div className="cart">

      {cart.length ? (
        <Typography align="center" variant="h3" style={{ margin: "30px" }}>
          Cart
        </Typography>
      ) : (
        <Typography align="center" variant="h3" style={{ margin: "30px" }}>
          {" "}
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
        );
      })}
      {cart.length ? (
        <React.Fragment>
          <Typography style={{ margin: "15px" }} align="center">
            {/* Subtotal: ${totalPrice === 0 ? 0 : totalPrice}.00 */}
          </Typography>

          <Box textAlign="right">
            <Button
              align="left"
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(clearCart(userId))}
              style={{ marginRight: "15px" }}
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
    </div>
  );
}
