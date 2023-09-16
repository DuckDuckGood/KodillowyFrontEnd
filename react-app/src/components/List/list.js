import { useSelector } from 'react-redux';
import Column from '../Column/column';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
import styles from './list.module.scss';
import { getAllColumns } from '../../redux/storeUtils';

const List = () => {
  const columns = useSelector(state => getAllColumns(state));
  return (
    <div>
      <header className={styles.header}>
        <p className={styles.title}>Things to do <span>soon</span></p>
      </header>
      <p className={styles.description}>Interesting things I want to check out!</p>
      <section id="columns">
        <article className={styles.columns}>
          {columns.map(column => <Column key={column.id} columnId={column.id} title={column.title} icon={column.icon}/>)}
          <ColumnCreator columns={columns}/>
        </article>
      </section>
    </div>
  );
};
export default List;