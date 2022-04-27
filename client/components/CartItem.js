import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} style={{ marginBottom: "5px" }}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={props.product.imageUrl}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.product.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  ${props.product.price / 100}.00/item
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {props.quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  {/* <Icon color="primary">add_circle</Icon> */}
                  {/* {props.quantity > 1 ? <Button onClick={props.decrement}>-</Button> : null} */}
                  {props.quantity > 1 ? (
                    <Button onClick={props.decrement}>
                      <RemoveIcon />
                    </Button>
                  ) : (
                    <Button disabled={true}>
                      <RemoveIcon />
                    </Button>
                  )}

                  <Button onClick={props.increment}>
                    <AddIcon />
                  </Button>
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
                ${(props.product.price * props.quantity) / 100}.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

// style={{marginLeft: '100px'}}
