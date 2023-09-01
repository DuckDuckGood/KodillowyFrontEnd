import styles from './column.module.scss';

const Column = parameters => (
  <article className={styles.column}>
    <h1 className={styles.title}>
      <span className={`${styles.icon} fa fa-${parameters.icon}`}></span>{parameters.title}
    </h1>
  </article>
);
export default Column;