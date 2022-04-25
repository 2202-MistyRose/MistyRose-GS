import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetch } from '../store/allProducts';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function AllProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  const { products } = useSelector((state) => state.products);

  // basic jsx, will edit with materialui
  return (
    <div className="">
      <h2>Shop All Products!</h2>
      <div className="">
        <Container maxWidth="lg">
          {products.map((product) => (
            <div key={product.id} className="">
              <Typography variant="h3">{product.name}</Typography>
              <img src={product.imageUrl} />
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
}
