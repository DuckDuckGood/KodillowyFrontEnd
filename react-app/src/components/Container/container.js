import styles from './container.module.scss';

const Container = parameters => (
  <div className={styles.container}>{parameters.children}</div>
);
export default Container;