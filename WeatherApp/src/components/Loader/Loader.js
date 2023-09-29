import styles from './Loader.module.scss';

const Loader = () => {

  const loaderVisible = props => {
    return props && props.loaderVisibility() ? styles.showLoader : styles.hideLoader;
  }

  return (<img
    className={`${styles.loader} ${loaderVisible()}`}
    alt="????"
    src={`${process.env.PUBLIC_URL}/images/loader.png`} />
  );
};

export default Loader;