import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/allProducts';

export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.value); // add value here bc its in obj, check reducer

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // basic jsx, will edit with materialui
  return (
    <div>
      <h2>Shop All Products!</h2>
      <div className='all-products'>
        {products.map(product => {
          return (
            <div key={product.id} className='product'>
              <img src={product.imageUrl} />
              <h3>{product.name}</h3>
              <h6>{product.description}</h6>
            </div>
          )
        })}
      </div>
    </div>
  )
}

