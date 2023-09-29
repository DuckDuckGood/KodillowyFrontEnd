import BaseResult from "./BaseResult/BaseResult";

const WrongCity = props => (
  <BaseResult weatherData={props.weatherData} param='wrongCity' imagePath='/images/weather-images/wrong-city.png' />
);

export default WrongCity;