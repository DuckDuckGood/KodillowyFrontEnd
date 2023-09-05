const ProductImage = props => (
  <img
    className={props.className}
    alt={`${props.name} shirt`}
    src={`${process.env.PUBLIC_URL}/images/products/shirt-${props.name}--${props.color}.jpg`}
  />
);
export default ProductImage;