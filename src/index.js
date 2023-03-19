let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  document.getElementById("current-date").innerHTML = formattedDate;
}

setInterval(formatDate(currentTime), 1000);

function formatTime(time) {
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = `Current time: ${hour}:${minutes}`;
  document.getElementById("current-time").innerHTML = formattedTime;
}
setInterval(formatTime(currentTime), 1000);

function showWeather(call) {
  let cityName = call.data.name;
  document.querySelector("#city-input").innerHTML = `${cityName}`;
  let newTemp = Math.round(call.data.main.temp);
  document.getElementById("temperature").innerHTML = `${newTemp}°C`;
}
function search(event) {
  event.preventDefault();
  let apiCall = "c0d9a9e35c6cd5c8e848537c38d4d67a";
  let city = document.querySelector("#search-text-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&units=metric&appid=${apiCall}`;
  axios.get(url).then(showWeather);
}

let searchBox = document.querySelector("#search-form");

searchBox.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.getElementById("temperature").innerHTML = `${temperature}°C`;
  let currentCity = response.data.name;
  document.getElementById("city-input").innerHTML = `${currentCity}`;
}

function showPosition(position) {
  let apiKey = "c0d9a9e35c6cd5c8e848537c38d4d67a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#Current");
button.addEventListener("click", getCurrentPosition);
