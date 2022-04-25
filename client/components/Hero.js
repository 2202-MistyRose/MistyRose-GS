import React, { useEffect, useState } from 'react';
import '../../public/styles/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { productsFetch } from '../store/allProducts';
import { getSingleProduct } from '../store/singleProduct';
import Banner from './banner';
import Carousel from './carousel';
import CartArea from './CartArea';
import Footer from './Footer';
import FooterBanner from './FooterBanner';
import { Link } from 'react-router-dom';

const Hero = () => {
  // const [initialState, setInitialState] = useState('whatever intial state you want');
  const { products } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  useEffect(() => {
    dispatch(getSingleProduct(1));
  }, []);

  useEffect(() => {}, []);

  console.log(products);
  return (
    <div>
      <>
        {/* add animation on scroll */}
        <Banner />

        <div className="products-heading">
          <h2>Our products are rated #1!!</h2>
          <p>join the team..</p>
        </div>

        <div className="products-container">
          {products?.map((product) => (
            <Link to={`/products/${product.id}`}>
              <div className="product-card">
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
        <Footer />
      </>
    </div>
  );
};

export default Hero;
