import styles from './Product.module.scss';
import ShoppingCartButton from '../ShoppingCartButton/ShoppingCartButton';
import SizeButtons from '../SizeButtons/SizeButtons';
import ColorButtons from '../ColorButtons/ColorButtons';
import { useState } from 'react';
import ProductImage from '../ProductImage/ProductImage';

const Product = props => {

  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const getShirtColor = () => {
    if (selectedColor) {
      return selectedColor;
    }
    return props.defaultColor;
  }
  
  const getAvailableColors = () => {
    const availableColors = {};
    Object.values(props.colors).forEach(color => {
      availableColors[color] = styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`];
    });
    return availableColors;
  };

  const getSize = () => {
    if (selectedSize) {
      return selectedSize;
    }
    return props.sizes[0].name;
  };

  const processOrder = e => {
    e.preventDefault();

    const order = {
      name: `${props.name} shirt`,
      price: getPrice(),
      size: getSize(),
      color: getShirtColor(),
    }

    console.log('Summary\n===========');
    console.log(order);
  }

  const getPrice = () => {
    const sizeAdditionalPrice = Object.values(props.sizes).filter(size => size.name === getSize())[0].additionalPrice;
    return parseInt(props.basePrice) + parseInt(sizeAdditionalPrice);
  };

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <ProductImage
          className={styles.image}
          name={props.name}
          color={getShirtColor()}
        />
      </div>
      <div>
        <header>
          <h2 className={styles.name}>{props.title}</h2>
          <span className={styles.price}>Price: {getPrice()}$</span>
        </header>
        <form>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>Sizes</h3>
            <SizeButtons
              sizes={props.sizes}
              setSelectedSize={setSelectedSize}
              activeButtonClassName={styles.active}
              activeSize={getSize}
              className={styles.choices}
            />
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ColorButtons
              colors={getAvailableColors()}
              activeButtonClassName={styles.active}
              setSelectedColor={setSelectedColor}
              activeColor={getShirtColor}
              className={styles.choices}
            />
          </div>
          <ShoppingCartButton processOrder={processOrder} className={styles.button}>
            <span className="fa fa-shopping-cart" />
          </ShoppingCartButton>
        </form>
      </div>
    </article>
  )
};

export default Product;