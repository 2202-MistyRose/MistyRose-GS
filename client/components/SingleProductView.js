import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {getSingleProduct} from '../store/singleProduct';

function singleProduct() {
  const {productId} = useParams()
  const {product} = useSelector((state) => state.product);
  useEffect(() => {
    getSingleProduct(productId)
  }, [])
  return (
    <div>
        <img src={`${product.imageUrl}`} />
        <p>{product.name}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.stock}</p>
        <p>{product.rating}</p>
      </div>
  )
}

export default singleProduct;
// export class SingleProduct extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//     };
//   }
//   componentDidMount() {
//     this.props.getSingleProduct(this.props.match.params.id);
//     // this.setState({ loading: false });
//   }

//   render() {
//     const product = this.props.product;

//     if (!product.id) {
//       return (
//         <div>
//           Product unavailable
//         </div>
//       );
//     }
//     // return (
//     //   <div>
//     //     <img src={`${product.imageUrl}`} />
//     //     <p>{product.name}</p>
//     //     <p>{product.category}</p>
//     //     <p>{product.description}</p>
//     //     <p>{product.price}</p>
//     //     <p>{product.stock}</p>
//     //     <p>{product.rating}</p>
//     //   </div>
//     // );
//   }
// }
