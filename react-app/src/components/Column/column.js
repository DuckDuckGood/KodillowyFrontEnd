import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import CardCreator from '../CardCreator/CardCreator';
import styles from './column.module.scss';
import { getFilteredCards } from '../../redux/storeUtils';

const Column = props => {

  const cards = useSelector(state => getFilteredCards(state, props.columnId));

  return (
    <article className={styles.column}>
      <h1 className={styles.title}>
        <span className={`${styles.icon} fa fa-${props.icon}`}></span>{props.title}
      </h1>
      <ul className={styles.cards}>
        {
          cards.map(card => <Card key={card.id} card={card}/>)
        }
      </ul>
      <CardCreator columnId={props.columnId}/>
    </article>
  );
};
export default Column;