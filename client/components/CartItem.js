import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux"
import { fetchCart } from "../store/userCart";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function CartItem(props) {
  const dispatch = useDispatch();
  console.log('props', props)
  const classes = useStyles();
  const {products} = useSelector((state) => state.products)
  const product = products.filter((prod) => prod.id === props.productId)

  // useEffect(() => {
  //   dispatch(fetchCart(userId))
  // }, [])
  // console.log('products', products)
  // console.log(product)
  // console.log('props id', props.productId)
  // console.log('actual prod', product[0])

  if (!product.length) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} style={{ marginBottom: "5px" }}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={product[0].imageUrl}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product[0].name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  ${product[0].price}.00/item
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {props.quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  {props.quantity > 1 ? (
                    <Button onClick={props.decrement}>-</Button>
                  ) : (
                    <Button disabled={true}>-</Button>
                  )}

                  <Button onClick={props.increment}>+</Button>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={props.remove}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                ${product[0].price * props.quantity}.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
