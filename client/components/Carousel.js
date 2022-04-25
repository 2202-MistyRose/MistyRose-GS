import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { productsFetch } from "../store/allProducts";

const Carousel = () => {
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    productsFetch();
  }, []);

  return <div>Carousel</div>;
};

export default Carousel;
