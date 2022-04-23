import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateQuantity, clearCart } from '../store/userCart';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const {userId} = useParams();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [])

  function increment(item) {
    item = {...item, quantity: item.quantity + 1};
    dispatch(updateQuantity({item, userId}))
  }

  function decrement(item) {
    item = {...item, quantity: item.quantity - 1};
    dispatch(updateQuantity({item, userId}))
  }

  // there may be a better method than this lol
  const totalPrice = cart.length === 0 ? 0 : cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
  // console.log('cart is', cart)
  // console.log('item is', cart[0])

  // just going to see what data is being received before breaking down the items below

  return (
    <div className="cart">
      <h1>Cart</h1>
      {cart.map(item => {
        return (
        <div key={item.product.id}>
          <img src={item.product.imageUrl} />
          <p>{item.product.name}</p>
          {/* <p>quantity: {item.quantity}</p> */}
          <div>
            <button onClick={() => decrement(item)}>-</button>
            <span> quantity: {item.quantity} </span>
            <button onClick={() => increment(item)}>+</button>
          </div>
          <button onClick={() => dispatch(removeFromCart({item, userId}))}>Remove Item</button>
        </div>
        )
      })}
      <button onClick={() => dispatch(clearCart(userId))}>Clear Cart</button>
      <div>Total Price: ${totalPrice === 0 ? 0 : totalPrice / 100}.00</div>
      <button>Checkout</button>
    </div>
  )
}
