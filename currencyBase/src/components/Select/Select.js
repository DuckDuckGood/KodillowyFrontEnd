import styles from './Select.module.scss';

const Select = props => {
  const { children, onChange, ...rest } = props;
  return (
    <select onChange={onChange} className={styles.select} {...rest}>
      {children}
    </select>
  );
};

export default Select;