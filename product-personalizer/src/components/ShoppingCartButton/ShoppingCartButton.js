import styles from './ShoppingCartButton.module.scss';
import clsx from 'clsx';

const ShoppingCartButton = (props) => {
    return (<button onClick={e => props.processOrder(e)} className={clsx(styles.button, props.className)}>{props.children}</button>);
};

export default ShoppingCartButton;