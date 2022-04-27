import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkout, fetchCart } from "../store/userCart";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © iPear "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { userId } = useParams();
  const [info, setInfo] = useState({
    first: "",
    last: "",
    address: "",
    payment: "",
    city: "",
    zip: "",
    country: "",
    cardName: "",
    number: "",
    exp: "",
    cvv: "",
  });

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const makePayment = () => {
    dispatch(checkout({ userId, cart }));
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            iPear (better than apple ;P )
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 ? (
                  <AddressForm info={info} setInfo={setInfo} />
                ) : activeStep === 1 ? (
                  <PaymentForm info={info} setInfo={setInfo} />
                ) : (
                  <Review info={info} setInfo={setInfo} />
                )}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={makePayment}
                      className={classes.button}
                    >
                      Place Order
                    </Button>
                  ) : activeStep === 0 ? (
                    <Button
                      disabled={
                        !info.first ||
                        !info.last ||
                        !info.address ||
                        !info.city ||
                        !info.zip ||
                        !info.country
                          ? true
                          : false
                      }
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  ) : activeStep === 1 ? (
                    <Button
                      disabled={
                        !info.cardName || !info.number || !info.exp || !info.cvv
                          ? true
                          : false
                      }
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  ) : null}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
