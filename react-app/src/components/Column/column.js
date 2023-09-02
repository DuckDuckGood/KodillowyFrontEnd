import Card from '../Card/Card';
import CardCreator from '../CardCreator/CardCreator';
import styles from './column.module.scss';

const Column = parameters => {

  const cards = parameters.cards;

  return (
    <article className={styles.column}>
      <h1 className={styles.title}>
        <span className={`${styles.icon} fa fa-${parameters.icon}`}></span>{parameters.title}
      </h1>
      <ul className={styles.cards}>
        {cards.map(card => <Card key={card.id} id={card.id} title={card.title}/>)}
      </ul>
      <CardCreator columnId={parameters.id} action={parameters.cardCreatorAction} />
    </article>
  );
};
export default Column;