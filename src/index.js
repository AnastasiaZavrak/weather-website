// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20
//   }
// };

// let city = prompt("Enter a city");
// city = city.trim();
// city = city.toLowerCase();
// if (weather.hasOwnProperty(city)) {
//   alert(
//     `It is currently ${Math.round(weather[city].temp)}°C (${Math.round(
//       (weather[city].temp * 9) / 5 + 32
//     )}°F) in ${
//       city.charAt(0).toUpperCase() + city.slice(1)
//     } with a humidity of ${weather[city].humidity}`
//   );
// } else {
//   if (city === "" || city === " " || !weather.hasOwnProperty(city)) {
//     alert(
//       "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
//         city
//     );
//   }
// }

import axios from "axios";

let now = new Date();
let time = document.querySelector("#currTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hoursMins = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit"
});
time.innerHTML = day + ", " + hoursMins;

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = "0cbaf29abb695f5e4a49d0ed30f00cdc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function myLocTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "0cbaf29abb695f5e4a49d0ed30f00cdc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function findCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
let form = document.querySelector(".search_input");
form.addEventListener("submit", findCityWeather);

searchCity("New York");

let myLoc = document.querySelector("#my-loc");
myLoc.addEventListener("click", myLocTemp);
