import BaseResult from "./BaseResult/BaseResult";

const FetchedWeather = props => (
  <BaseResult weatherData={props.weatherData} imagePath='/images/weather-icons/13d.png' />
);

export default FetchedWeather;