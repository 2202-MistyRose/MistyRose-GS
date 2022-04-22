import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/userCart';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const {userId} = useParams();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [])

  console.log(cart)
  // just going to see what data is being received before breaking down the items below

  return (
    <div className="cart">
      <h1>Cart</h1>
      {cart.map(item => {
        <div key={item.id}>
          <p>item</p>
        </div>
      })}
    </div>
  )
}
