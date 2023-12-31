import styles from './text-input.module.scss';

const TextInput = parameters => (
  <input className={styles.input} placeholder={parameters.placeholder} type="text" onChange={parameters.onChange} />
);
export default TextInput;