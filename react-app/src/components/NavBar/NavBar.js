import styles from './nav-bar.module.scss';
import { changeLocationHash } from '../Utils/utils';

const NavBar = () => (
  <div className={styles.navBar}>
    <div className={styles.left}>
      <div className='fa fa-tasks'></div>
    </div>
    <div className={styles.right}>
      <div onClick={e => changeLocationHash(e)}>Home</div>
      <div onClick={e => changeLocationHash(e)}>Favorite</div>
      <div onClick={e => changeLocationHash(e)}>About</div>
    </div>
  </div>
);

export default NavBar;