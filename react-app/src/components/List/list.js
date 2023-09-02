import Column from '../Column/column';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
import styles from './list.module.scss';
import { useState } from 'react';

const List = () => {
  const [columns, setColumns] = useState([
    {id: 1, title: 'Books', icon: 'book'},
    {id: 2, title: 'Movies', icon: 'film'},
    {id: 3, title: 'Games', icon: 'gamepad'},
  ]);


  return (
    <div>
      <header className={styles.header}>
        <p className={styles.title}>Things to do <span>soon</span></p>
      </header>
      <p className={styles.description}>Interesting things I want to check out!</p>
      <section id="columns">
        <article className={styles.columns}>
          {columns.map(column => <Column key={column.id} title={column.title} icon={column.icon}/>)}
          <ColumnCreator columns={columns} columnsCallback={setColumns} />
        </article>
      </section>
    </div>
  );
};
export default List;