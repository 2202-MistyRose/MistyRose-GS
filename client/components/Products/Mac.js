import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetch } from '../../store/allProducts';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { addToCart } from '../../store/userCart';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MacBanner from '../MacBanner';

export default function AllProducts() {
  const dispatch = useDispatch();
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
    dispatch(productsFetch());
  }, []);

  const { products } = useSelector((state) => state.products);
  console.log(products, 'products');
  const mac = products.filter((product) => product.category === 'Laptop');
  return (
    <div className="">
      <div className="">
        <Container maxWidth="lg">
          <MacBanner />
          <Grid
            container
            className={classes.root}
            spacing={4}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {mac.map((product) => {
              return (
                <Grid item xs={12} md={6}>
                  <Paper>
                    <div key={product.id} className="">
                      <Grid item xs={12} md={12}>
                        <Link to={`/products/${product.id}`}>
                          <Typography component="span" variant="h3">
                            {product.name}
                          </Typography>
                        </Link>
                      </Grid>
                      <Link to={`/products/${product.id}`}>
                        <Grid item xs={12} md={6}>
                          <img src={product.imageUrl} style={{ height: 300 }} />
                        </Grid>
                      </Link>
                      <Grid item xs={8}>
                        <Typography component="span" variant="h6">
                          {product.description}
                        </Typography>
                      </Grid>
                      <button
                        className="hero-banner-button"
                        onClick={() => dispatch(addToCart({ product, user }))}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
