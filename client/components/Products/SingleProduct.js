
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../store/singleProduct";

import { addToCart } from "../../store/userCart";
import Footer from "../Footer";
import { Grid, makeStyles, Button } from "@material-ui/core";

function SingleProduct() {
  const { user } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

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
      <Grid container alignItems="center" className={classes.root} spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={product.imageUrl} alt={product.name} />
        </Grid>
        <Grid style={{ padding: 50 }} item xs={12} md={6} className="">
          <h1>{product.name}</h1>
          <h2>from ${product.price} or $xx.xx/mo. for 24 mo.</h2>


          <Button
            onClick={() => dispatch(addToCart({ product, user }))}
            color="primary"
            variant="contained"
          >
            Buy
          </Button>
          <h3>{product.rating}</h3>
          <h2 style={{ marginBottom: 30 }}>{product.description}</h2>
          <h4>stock: {product.stock}</h4>
          <p>category:{product.category}</p>
        </Grid>
      </Grid>
    </>
  );
}

export default SingleProduct;
