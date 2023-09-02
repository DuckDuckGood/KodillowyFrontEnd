import styles from './card.module.scss';

const Card = parameters => (
  <li className={styles.card} key={parameters.id}>{parameters.title}</li>
);

export default Card;