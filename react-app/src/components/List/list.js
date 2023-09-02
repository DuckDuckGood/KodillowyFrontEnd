import Column from '../Column/column';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
import styles from './list.module.scss';
import shortid from 'shortid';
import { useState } from 'react';

const List = () => {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: 'Books',
      icon: 'book',
      cards: [
        { id: 1, title: 'This is Going to Hurt' },
        { id: 2, title: 'Interpreter of Maladies' }
      ]
    },
    {
      id: 2,
      title: 'Movies',
      icon: 'film',
      cards: [
        { id: 1, title: 'Harry Potter' },
        { id: 2, title: 'Star Wars' }
      ]
    },
    {
      id: 3,
      title: 'Games',
      icon: 'gamepad',
      cards: [
        { id: 1, title: 'The Witcher' },
        { id: 2, title: 'Skyrim' }
      ]
    },
  ]);

  const addCard = (newCard, columnId) => {
    const columnsUpdated = columns.map(column => {
      if (column.id === columnId) {
        return {...column, cards: [...column.cards, { id: shortid(), title: newCard.title }]}
      }
      return column;
    });

    setColumns(columnsUpdated);
  }

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.title}>Things to do <span>soon</span></p>
      </header>
      <p className={styles.description}>Interesting things I want to check out!</p>
      <section id="columns">
        <article className={styles.columns}>
          {columns.map(column => <Column key={column.id} id={column.id} title={column.title} icon={column.icon} cards={column.cards} cardCreatorAction={addCard}/>)}
          <ColumnCreator columns={columns} columnsCallback={setColumns} />
        </article>
      </section>
    </div>
  );
};
export default List;