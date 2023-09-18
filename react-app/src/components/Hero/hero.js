import styles from './hero.module.scss';

const Hero = props => (
  <div className={styles.hero}>
    <h1 className={styles.title}>{props.title}</h1>
    <p className={styles.subtitle}>{props.subtitle}</p>
  </div>
);

export default Hero;