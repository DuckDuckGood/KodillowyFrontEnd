import { useDispatch } from 'react-redux';
import styles from './card.module.scss';
import { toggleFavoriteCard, removeCard } from '../../redux/storeUtils';

const Card = props => {
  const card = props.card;
  console.log(card);
  const dispatch = useDispatch();

  const toggleFavorite = () => {
    dispatch(toggleFavoriteCard(card));
  };

  const remove = () => {
    dispatch(removeCard(card));
  }

  return (
    <li className={styles.card} key={card.id}>
      <div className={styles.title}>
        {card.title}
      </div>
      <div className={styles.icons}>
        <div onClick={toggleFavorite} className={`${styles.icon} ${styles.possibleFavorite} ${card.favorite ? styles.favorite : ''} fa fa-star-o`}></div>
        <div onClick={remove} className={`${styles.icon} ${styles.trash} fa fa-trash`}></div>
      </div>
    </li>
  );
};

export default Card;