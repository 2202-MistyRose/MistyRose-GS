import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateQuantity, clearCart, checkout } from '../store/userCart';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

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
  }, 0);

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
            {item.quantity > 1 ? <button onClick={() => decrement(item)}>-</button> : null}
            <span> quantity: {item.quantity} </span>
            <button onClick={() => increment(item)}>+</button>
          </div>
          <button onClick={() => dispatch(removeFromCart({item, userId}))}>Remove Item</button>
        </div>
        )
      })}
      <button onClick={() => dispatch(clearCart(userId))}>Clear Cart</button>
      <div>Total Price: ${totalPrice === 0 ? 0 : totalPrice / 100}.00</div>
      {/* <button onClick={() => dispatch(checkout(userId))}>Checkout</button> */}
      <Link to={`/users/${userId}/checkout`}>Checkout</Link>
      {/* <a href={<Checkout total={totalPrice}/>}>Checkout</a> */}

    </div>
  )
}

// can i just link the checkout in an a tag? want to pass down the total as a prop to make things earier
