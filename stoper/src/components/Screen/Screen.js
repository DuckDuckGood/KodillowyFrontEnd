import styles from './screen.module.scss';

const Screen = () => (
  <div className={styles.screen}>
    <span id="hours">00</span>:
    <span id="minutes">00</span>:
    <span id="seconds">00</span>.
    <span id="miliseconds">000</span>
  </div>
);
export default Screen;