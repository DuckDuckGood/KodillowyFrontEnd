import { useDispatch } from 'react-redux';
import styles from './card.module.scss';
import { toggleFavoriteCard } from '../../redux/storeUtils';

const Card = props => {
  const card = props.card;
  const dispatch = useDispatch();

  const clicked = () => {
    dispatch(toggleFavoriteCard(card));
  };

  return (
    <li className={styles.card} key={card.id}>
      <div className={styles.title}>
        {card.title}
      </div>
      <div onClick={clicked} className={`${styles.icon} ${card.favorite ? styles.favorite : ''} fa fa-star-o`}></div>
    </li>
  );
};

export default Card;