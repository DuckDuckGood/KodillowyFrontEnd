import styles from './button.module.scss';

const Button = props => (
  <div className={styles.button} onClick={props.onClick}>{props.children}</div>
);
export default Button;