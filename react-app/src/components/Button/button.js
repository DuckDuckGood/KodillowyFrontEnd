import styles from './button.module.scss';

const Button = parameters => (
  <button className={styles.button}>{parameters.children ? parameters.children : <span className='fa fa-search'></span>}</button>
);
export default Button;