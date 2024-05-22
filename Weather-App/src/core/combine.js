import { cityInput, searchBtn } from "./selectors";

export const api_key = "a0881255ef2e23cb25cdc2f2d5406bdf";
export const currentWeatherCard = document.querySelectorAll(
  ".weather-left .card"
)[0];

export const fiveDaysForecastCard = document.querySelector(".day-forecast");

export const getWeatherDetail = (name, lat, lon, country, state) => {
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML = `            
      <div class="current-weather flex justify-between items-center">
        <div class="details">
          <p class="text-[14px] text-gray-400">Now</p>
          <h2 class="text-[32px] font-[500] m-[7px]">${(
            data.main.temp - 273.15
          ).toFixed(2)}&deg;C</h2>
          <p class="text-[14px] text-gray-400">${
            data.weather[0].description
          }</p>
        </div>
        <div class="weather-icon">
        <img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="">
        </div>
      </div>
      <hr class="mb-[10px]" />
      <div class="card-footer">
        <p class="text-gray-400 mb-[12px] text-[14px]">
          <i class="fa-solid fa-calendar-days"></i>${
            days[date.getDay()]
          },${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}
        </p>
        <p class="text-gray-400 mb-[12px] text-[14px]">
          <i class="fa-solid fa-location-dot"></i>${name}, ${country}
        </p>
      </div>`;
    })
    .catch(() => {
      alert("Failed to fetch current weather");
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      fiveDaysForecastCard.innerHTML = '';
      for (let i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
            <div
            class="forecast-item grid grid-cols-3 place-items-center mb-[15px]"
          >
            <div class="icon-wrapper flex items-center">
              <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
              <span class="inline-block">${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
            </div>
            <p class="text-gray-400">${date.getDate()} ${months[date.getMonth()]}</p>
            <p class="text-gray-400">${days[date.getDay()]}</p>
          </div>
            `;
      }
    })
    .catch(() => {
      alert(`Failed to fetch weather forecast`);
    });
};

export const getCityCoordinates = () => {
  let cityName = cityInput.value.trim();
  console.log(cityName);
  cityInput.value = "";
  if (!cityName) return;
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const { name, lat, lon, country, state } = data[0];
      getWeatherDetail(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to fetch coordinate of ${cityName}`);
    });
};
