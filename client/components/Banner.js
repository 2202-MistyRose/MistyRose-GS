import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../store/singleProduct";

const Banner = () => {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(1));
  }, []);

  return (
    <div className="hero-banner-container">
      <div>
        <h4 className="product-style">{`$${product.price}`}</h4>
        <h3>#1 phone on the market!</h3>
        <h1>{product.name}</h1>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="hero-banner-image"
        />
        <Link to={`/products/${product.id}`}>
          <button type="button" className="hero-banner-button">
            learn more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
