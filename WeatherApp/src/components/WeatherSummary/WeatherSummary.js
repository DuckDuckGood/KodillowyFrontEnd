import React from 'react';
import WrongCity from './WeatherResults/WrongCity';
import FetchedWeather from './WeatherResults/FetchedWeather';
import Bug from './WeatherResults/Bug';

const WeatherSummary = props => {

  let child;

  if (parseInt(props.weatherData.cod) === 200) {
    child = <FetchedWeather weatherData={props.weatherData} />;
  } else if (parseInt(props.weatherData.cod) === 404) {
    child = <WrongCity />;
  } else if (parseInt(props.weatherData.cod) === 401) {
    child = <Bug />
  }

  return (
    <section>
      {child}
    </section>
  );
};

export default WeatherSummary;