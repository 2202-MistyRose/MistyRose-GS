import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../store/allProducts";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import { addToCart } from "../store/userCart";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "center",
});

export default function AllProducts() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  const { products } = useSelector((state) => state.products);

  // basic jsx, will edit with materialui
  return (
    <div>
      <h2>Shop All Products!</h2>
      <div className="all-products">
        <Container maxWidth="sm">
          {products.map((product) => (
            <div key={product.id} className="product">
              <Typography variant="h3">{product.name}</Typography>
              <img src={product.imageUrl} />
              <Typography variant="h6">{product.description}</Typography>
              <Button onClick={() => dispatch(addToCart({product, user}))}>
              Add to Cart</Button>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
}
