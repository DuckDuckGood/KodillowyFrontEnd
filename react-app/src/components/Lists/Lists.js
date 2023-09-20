import { useSelector } from 'react-redux';
import styles from './list.module.scss';
import { Link } from 'react-router-dom';

const Lists = () => {
const lists = useSelector(store => store.lists);

  return (
    <section className={styles.lists}>
    <h2 className={styles.heading}>Browse lists</h2>
    {lists.map(list => (
      <Link key={list.id} to={`list/${list.id}`} className={styles.listLink}>
        <h3>{list.title}</h3>
        <p>{list.description}</p>
      </Link>
    ))}
  </section>
  );
};

export default Lists;