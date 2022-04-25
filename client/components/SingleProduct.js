import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleProduct } from '../store/singleProduct';
import Footer from './Footer';
import { Grid, makeStyles } from '@material-ui/core';

function SingleProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 250,
      width: 250,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, []);

  return (
    <>
      {/* <div className="hero-banner-container">
        <div>
          <h4 className="product-style">{`$${product.price}`}</h4>
          <h1>{product.name}</h1>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="hero-banner-image"
          />
        </div>
      </div> */}
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={product.imageUrl} alt={product.name} />
        </Grid>
        <Grid item xs={12} md={6} className="">
          <h1>{product.name}</h1>
          <h2>from ${product.price} or $xx.xx/mo. for 24 mo.</h2>
          <button type="button" className="hero-banner-button">
            Buy
          </button>
          <h3>{product.rating}</h3>
          <p>{product.description}</p>
          <p>{product.stock}</p>
          <p>{product.category}</p>
        </Grid>
        <Grid item xs={12} md={6} className="desc">
          <h3>{product.rating}</h3>
          <p>{product.description}</p>
          <p>{product.stock}</p>
          <p>{product.category}</p>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default SingleProduct;
