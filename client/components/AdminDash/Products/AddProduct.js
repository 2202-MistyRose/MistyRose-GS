import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Container,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../store/allProducts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "1 0 auto",
    margin: theme.spacing(1),
    maxHeight: 400,
    overflow: "auto",
  },
  inputText: {
    color: "rgba(0,0,0,0.87)",
    fontSize: "16px",
    letterSpacing: "0.5px",
    lineHeight: "28px",
    textAlign: "center",
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AddProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.products);

  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (data) => (e) => {
    e.preventDefault();
    dispatch(createProduct(data));
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Add Product</Title>
      <Container>
        <Paper>
          <Grid
            className={classes.paper}
            container
            direction="row"
            alignItems="center"
          >
            <Table size="large">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Create</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                      InputProps={classes.inputText}
                      id="outlined-basic"
                      variant="outlined"
                      name="name"
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                      InputProps={classes.inputText}
                      id="outlined-basic"
                      variant="outlined"
                      name="imageUrl"
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "11rem",
                      }}
                      noWrap="false"
                    >
                      <TextField
                        inputProps={{ style: { fontSize: 10 } }}
                        InputLabelProps={{ style: { fontSize: 10 } }}
                        variant="outlined"
                        name="description"
                        onChange={handleChange}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                      InputProps={classes.inputText}
                      id="outlined-basic"
                      variant="outlined"
                      name="price"
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                      InputProps={classes.inputText}
                      id="outlined-basic"
                      variant="outlined"
                      name="stock"
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                      InputProps={classes.inputText}
                      id="outlined-basic"
                      variant="outlined"
                      name="category"
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box component="form" onSubmit={handleSubmit(formData)}>
                      <Button type="submit">
                        <AddCircleOutlineIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Paper>
      </Container>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more products
        </Link>
      </div>
    </React.Fragment>
  );
}
