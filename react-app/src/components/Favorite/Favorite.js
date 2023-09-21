import { useSelector } from 'react-redux';
import Hero from '../Hero/hero';
import { getFavoriteCards } from '../../redux/storeUtils';
import Card from '../Card/Card';
import styles from './favorite.module.scss';

const Favorite = () => {
  const cards = useSelector(state => getFavoriteCards(state));

  console.log(cards);

  return (
    <div>
      <Hero title='Favorite'/>
      <div className={styles.container}>
        <div className={styles.cards}>
          {cards.map(card => <Card card={card}/>)}
        </div>
      </div>
    </div>
  );
};

export default Favorite;