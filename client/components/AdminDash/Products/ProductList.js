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
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import {
  productsFetch,
  updateProduct,
  removeProduct,
} from "../../../store/allProducts";

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

export default function ProductList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [formData, setFormData] = useState("");

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  const handleChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (data) => (e) => {
    e.preventDefault();
    dispatch(updateProduct(data));
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Product List</Title>
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
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box
                        component="form"
                        onSubmit={handleSubmit({ product, formData })}
                      >
                        <TextField
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          InputProps={classes.inputText}
                          id="outlined-basic"
                          label={product.name}
                          variant="outlined"
                          name="name"
                          onChange={handleChange}
                        />
                        <Button type="submit">
                          <UpdateIcon />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        component="form"
                        onSubmit={handleSubmit({ product, formData })}
                      >
                        <TextField
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          InputProps={classes.inputText}
                          id="outlined-basic"
                          label={product.imageUrl}
                          variant="outlined"
                          name="imageUrl"
                          onChange={handleChange}
                        />
                        <Button type="submit">
                          <UpdateIcon />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        component="form"
                        onSubmit={handleSubmit({ product, formData })}
                      >
                        <Typography
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "10rem",
                          }}
                          noWrap="false"
                        >
                          <TextField
                            inputProps={{ style: { fontSize: 10 } }}
                            InputLabelProps={{ style: { fontSize: 10 } }}
                            label={product.description}
                            variant="outlined"
                            name="description"
                            onChange={handleChange}
                          />
                        </Typography>

                        <Button type="submit">
                          <UpdateIcon />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        component="form"
                        onSubmit={handleSubmit({ product, formData })}
                      >
                        <TextField
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          InputProps={classes.inputText}
                          id="outlined-basic"
                          label={product.price}
                          variant="outlined"
                          name="price"
                          onChange={handleChange}
                        />
                        <Button type="submit">
                          <UpdateIcon />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        component="form"
                        onSubmit={handleSubmit({ product, formData })}
                      >
                        <TextField
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          InputProps={classes.inputText}
                          id="outlined-basic"
                          label={product.category}
                          variant="outlined"
                          name="category"
                          onChange={handleChange}
                        />
                        <Button type="submit">
                          <UpdateIcon />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => dispatch(removeProduct(product.id))}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
