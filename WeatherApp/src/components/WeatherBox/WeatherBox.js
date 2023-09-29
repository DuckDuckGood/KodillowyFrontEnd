import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import { callForWeather } from '../utils';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(false);

  const toggleLoaderVisibility = () => {
    setLoaderVisible(!loaderVisible);
  }

  const isLoaderVisible = () => {
    return loaderVisible;
  }

  const handleChangeCity = useCallback(city => {
    toggleLoaderVisibility();
    callForWeather(city).then(data => {
      setWeatherData(
        {
          cod: data.cod,
          city: data.name,
          temp: data.main ? data.main.temp : undefined,
          icon: data.weather ? data.weather[0].icon : undefined,
          description: data.weather ? data.weather[0].main : undefined,
        }
      );
      toggleLoaderVisibility();
    });
  }, []); // eslint-disable-line

  return (
    <section>
      <PickCity setCity={handleChangeCity} />
      {weatherData && weatherData.cod && <WeatherSummary weatherData={weatherData} />}
      <Loader loaderVisibility={isLoaderVisible} />
    </section>
  )
};

export default WeatherBox;