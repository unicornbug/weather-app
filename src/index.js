//formating date
let date = new Date();
let month = date.getMonth() + 1;
let dateFormat = `${date.getDate()}/${month}/${date.getFullYear()}`;
let updateDate = document.querySelector("#updateDate");
updateDate.innerHTML = dateFormat;

//formating weekday, time

let minutes = date.getMinutes();
minutes = minutes.toString();
let hour = date.getHours();
hour = hour.toString();
let time = `${hour.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = week[date.getDay()];
let updateTime = document.querySelector("#updateTime");
updateTime.innerHTML = `${weekDay}, ${time}`;

//getting weather info from api
function updateTemperature(response) {
  console.log(response.data);
  let newTown = document.querySelector("h1");
  newTown.innerHTML = `${response.data.name}`;

  let currentTemp = document.getElementById("#current-temperature");
  currentTemp.innerHTML = `${Math.round(
    parseFloat(response.data.main.temp) - 273.15
  )}`;

  let humidity = document.querySelector("#relative-humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let feelsLike = document.querySelector("#feels-like");
  let realFeal = Math.round(parseFloat(response.data.main.feels_like) - 273.15);
  feelsLike.innerHTML = `${realFeal}`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}`;

  let maxT = document.querySelector("#maxT");
  maxT.innerHTML = `${Math.round(
    parseFloat(response.data.main.temp_max) - 273.15
  )}`;
  let minT = document.querySelector("#minT");
  minT.innerHTML = `${Math.round(
    parseFloat(response.data.main.temp_min) - 273.15
  )}`;

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${response.data.weather[0].description}`;
}

//Search for new city and updating h1
function searchingTown(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#find-town");
  let city = cityInput.value;
  //Calling api
  let apiKey = `c7546b821a53b6bba326661973b08c2d`;
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(`${openWeatherUrl}`).then(updateTemperature);
}

let findTown = document.querySelector("#search-form");
findTown.addEventListener("submit", searchingTown);

//Searching for local weather
function showPosition(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `c7546b821a53b6bba326661973b08c2d`;
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(openWeatherUrl).then(updateTemperature);
}

function findLocalWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
  //
  //
  //axios.get(`${openWeatherUrl}`).then(showTemperature);
}
let button = document.getElementById("location");
button.addEventListener("click", findLocalWeather);

//updating temperature
function calculateF(event) {
  event.preventDefault();

  let temperature = document.getElementById("#current-temperature");
  temperature.innerHTML = Math.round(
    parseInt(temperature.innerHTML, 0) * 1.8 + 32
  );
  //injecting css (change of color)
  let fahrenheit = document.querySelector("#f");
  let celsius = document.querySelector("#c");
  fahrenheit.style.color = "black";
  celsius.style.color = "rgba(54, 56, 62, 0.4)";

  celsius.addEventListener("click", calculateC);
}

function calculateC(event) {
  event.preventDefault();
  let temperature = document.getElementById("#current-temperature");
  temperature.innerHTML = Math.round(
    (parseInt(temperature.innerHTML, 0) - 32) / 1.8
  );

  let celsius = document.querySelector("#c");
  let fahrenheit = document.querySelector("#f");
  celsius.style.color = "black";
  fahrenheit.style.color = "rgba(54, 56, 62, 0.4)";
}

let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", calculateF);
