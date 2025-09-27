let form = document.querySelector("form");
let temp = document.querySelector(".display-temp");
let cityName = document.querySelector(".display-city");
let mainImage = document.querySelector("#main-img");
let humidity = document.querySelector(".display-humidity");
let windSpeed = document.querySelector(".display-wind");
let err = document.querySelector(".err");

// const API_KEY = "34b21f25e795b6cce422bf7698b2e444";
const API_KEY = "c8f8dbea1e97acbd6472c42f6bfe19a3";

form.onsubmit = function (e) {
  e.preventDefault();
  let { city } = Object.fromEntries(new FormData(this));

  //Async a wait to fetch data
  const fetchWeatherData = async (city) => {
    try {
      let data = await window.fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      let finalData = await data.json();
      let { name, weather, main, wind, cod, message } = finalData;

      if (cod == "404" || message == "city not found") {
        err.innerHTML = "<h4>City not found!</h4>";
        err.style.display = "block";

        setTimeout(() => {
          err.style.display = "none";
        }, 3000);
      } else {
        temp.innerHTML = `${Math.round(main.temp - 273.15)}°C`;
        cityName.innerHTML = name;
        humidity.innerHTML = main.humidity + "%";
        windSpeed.innerHTML = wind.speed + " km/hr";
        mainImage.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      }
    } catch (e) {
      console.log("Error fetching weather data:", e);
    }
  };

  fetchWeatherData(city);
};
