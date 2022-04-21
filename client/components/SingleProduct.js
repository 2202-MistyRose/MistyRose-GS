import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getSingleProduct} from '../store/singleProduct';

function SingleProduct() {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const {product} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSingleProduct(productId))
  }, [])

  return (
    <div>
        <img src={product.imageUrl} />
        <p>{product.name}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>
        {/* <p>{product.price}</p>
        <p>{product.stock}</p>
        <p>{product.rating}</p> */}
      </div>
  )
}

export default SingleProduct;
