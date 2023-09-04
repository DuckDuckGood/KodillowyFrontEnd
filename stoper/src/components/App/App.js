import styles from './app.module.scss';
import Screen from '../Screen/Screen';
import Buttons from '../Buttons/Buttons';

const App = () => (
  <div className={styles.app}>
    <Screen />
    <Buttons />
  </div>
);
export default App;