import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCart } from '../store/userCart';

// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   // { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({info, setInfo}) {
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart)
  const {userId} = useParams()

  useEffect(() => {
    dispatch(fetchCart(userId))
  }, [])

  const classes = useStyles();
  const card = 'XXXX-XXXX-XXXX-' + info.number.slice(info.number.length - 4)

  const totalPrice =
  cart.length === 0
    ? 0
    : cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem className={classes.listItem} key={item.product.name}>
            <ListItemText primary={item.product.name} secondary={`(${item.quantity}x)`} />
            <Typography variant="body2">${item.product.price * item.quantity}</Typography>
        </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${totalPrice}.00
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment and Shipping
          </Typography>
          <Typography variant='body1'>Name: {info.first} {info.last}</Typography>
          <Typography variant='body1'>Address: {info.address}, {info.city} {info.zip}</Typography>
          <Typography variant='body1'>Payment: {info.cardName} {card} EXP: {info.exp}</Typography>
          <Typography variant='body1'></Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
