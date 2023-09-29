const TOKEN = 'a5e3828c6f32cd5a48a93f4f3180df5e';

export const callForWeather = CITY => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${TOKEN}&units=metric`)
   .then(res => res.json());
}