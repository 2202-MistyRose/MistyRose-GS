import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function Checkout(props) {
  const {userId} = useParams();

  return (
    <div>
      <div>Checkout</div>
      <div>Your total is: $</div>
      <Link to={`/users/${userId}/cart`}>Back to Cart</Link>
    </div>
  )
}
