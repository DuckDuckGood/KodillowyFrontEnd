import { useSelector } from 'react-redux';
import Column from '../Column/column';
import ColumnCreator from '../ColumnCreator/ColumnCreator';
import styles from './list.module.scss';
import { getColumnsById, getListById } from '../../redux/storeUtils';
import { useParams } from 'react-router-dom';
import CardFilter from '../CardFilter/CardFilter';

const List = props => {
  const { listId } = useParams();
  const selectedList = useSelector(state => getListById(state, listId));
  const { title, description, id } = props.list || selectedList;
  const columns = useSelector(state => getColumnsById(state, id));

  return (
    <div>
      <CardFilter />
      <header className={styles.header}>
        <p className={styles.title}>{title}</p>
      </header>
      <p className={styles.description}>{description}</p>
      <section id="columns">
        <article className={styles.columns}>
          {columns
            .filter(column => parseInt(column.listId) === parseInt(id))
            .map(column => <Column key={column.id} columnId={column.id} title={column.title} icon={column.icon}/>)}
          <ColumnCreator listId={id} columns={columns}/>
        </article>
      </section>
    </div>
  );
};
export default List;