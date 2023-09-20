import styles from './nav-bar.module.scss';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className={styles.navBar}>
    <div className={styles.left}>
      <div className='fa fa-tasks'></div>
    </div>
    <div className={styles.right}>
      <ul>
        <li>
          <NavLink className={(nav) => nav.isActive ? styles.linkActive : styles.noActive} to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={(nav) => nav.isActive ? styles.linkActive : undefined} to = '/favorite'>
            Favorite
          </NavLink>
        </li>
        <li>
          <NavLink className={(nav) => nav.isActive ? styles.linkActive : undefined} to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default NavBar;