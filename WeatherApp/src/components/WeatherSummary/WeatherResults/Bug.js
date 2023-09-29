import BaseResult from "./BaseResult/BaseResult";

const Bug = props => (
  <BaseResult weatherData={props.weatherData} param='bug' imagePath='/images/weather-images/bug.png' />
);

export default Bug;