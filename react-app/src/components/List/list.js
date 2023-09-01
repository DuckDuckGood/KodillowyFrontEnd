import Column from '../Column/column';
import styles from './list.module.scss';

const List = () => (
  <div>
    <header className={styles.header}>
      <p className={styles.title}>Things to do <span>soon</span></p>
    </header>
    <p className={styles.description}>Interesting things I want to check out!</p>
    <section id="columns">
      <article className={styles.columns}>
        <Column title='Books' icon='book' />
        <Column title='Movies' icon='film' />
        <Column title='Games' icon='gamepad' />
      </article>
    </section>
  </div>
);
export default List;