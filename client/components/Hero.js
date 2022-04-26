import React, { useEffect } from 'react';
import '../../public/styles/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { productsFetch } from '../store/allProducts';
import Banner from '../Banner';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  return (
    <div>
      <>
        <Banner />

        <div className="products-heading">
          <h2>Our products are rated #1!!</h2>
          <p>join the team..</p>
        </div>

        <div className="products-container">
          {products?.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="product-card" key={product.id}>
                <img
                  src={product.imageUrl}
                  width={250}
                  height={250}
                  className="product-image"
                />
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

export default Hero;
