import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetch } from '../store/allProducts';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';
import { withThemeCreator } from '@material-ui/core/node_modules/@material-ui/styles';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'center',
});

export default function AllProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  const { products } = useSelector((state) => state.products);

  console.log(products);
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
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
}
