import styles from './BaseResult.module.scss';

const BaseResult = props => {
  const city = props.param === 'wrongCity'
    ? `Istnieje takie miasto?!`
    : (
      props.param === 'bug'
        ? 'Bug!'
        : props.weatherData.city
      );

  const temp = props.weatherData && props.weatherData.temp
    ? <p>
        <strong>
          Temp:
        </strong> 
        &nbsp;{props.weatherData.temp}°C
      </p>
    : undefined;

  return (
    <div className={styles.weatherSummary}>
      <img
          className={styles.weatherIcon}
          alt="????"
          src={`${process.env.PUBLIC_URL}${props.imagePath}`} />
      <div className={styles.weatherInfo}>
        <h2>{city}</h2>
        {temp}
      </div>
    </div>
  );
};

export default BaseResult;