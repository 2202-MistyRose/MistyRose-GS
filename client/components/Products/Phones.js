import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetch } from '../../store/allProducts';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { addToCart } from '../../store/userCart';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Banner from '../Banner';
import Button from '@material-ui/core/Button';

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
  const phones = products.filter((product) => product.category === "Phone");
  // basic jsx, will edit with material ui
  return (
    <div className="">
      <div className="">
        <Container maxWidth="lg">
          <Banner />
          <Grid
            container
            className={classes.root}
            spacing={4}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {phones.map((product) => {
              return (
                <Grid item xs={12} md={6}>
                  <Paper>
                    <div key={product.id} className="">
                      <Link to={`/products/${product.id}`}>
                        <Grid item xs={12} md={6}>
                          <Typography component="span" variant="h3">
                            {product.name}
                          </Typography>
                        </Grid>
                      </Link>
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
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => dispatch(addToCart({ product, user }))}
                      >
                        Add to Cart
                      </Button>
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
