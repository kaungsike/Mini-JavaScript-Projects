import { cityInput, searchBtn } from "./selectors";

export const api_key = "a0881255ef2e23cb25cdc2f2d5406bdf";
export const currentWeatherCard = document.querySelectorAll(
  ".weather-left .card"
)[0];
export const aqiCard = document.querySelectorAll(".highlights .card")[0];
export const sunriseCard = document.querySelectorAll(".highlights .card")[1];

export const fiveDaysForecastCard = document.querySelector(".day-forecast");

export const aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

export const getWeatherDetail = (name, lat, lon, country, state) => {
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
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

  fetch(AIR_POLLUTION_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
      aqiCard.innerHTML = `
    <div
    class="card-head flex items-center justify-between mb-[10px]"
  >
    <p>Air Quantity Index</p>
    <p
      class="air-index text-black py-[5px] px-[10px] rounded-[15px] bg-yellow-300 aqi-${
        data.list[0].main.aqi
      }"
    >
      ${aqiList[data.list[0].main.aqi - 1]}
    </p>
  </div>
  <div
    class="air-indices grid-cols-3 sm:grid-cols-4 grid md:grid-cols-3 2xl:grid-cols-4 place-items-center"
  >
    <i class="fa-solid fa-wind fa-2x"></i>
    <div class="item">
      <p class="text-center text-gray-400">PM2.5</p>
      <h2 class="text-xl">${pm2_5}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">PM10</p>
      <h2 class="text-xl">${pm10}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">SO2</p>
      <h2 class="text-xl">${so2}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">CO</p>
      <h2 class="text-xl">${co}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">NO</p>
      <h2 class="text-xl">${no}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">NO2</p>
      <h2 class="text-xl">${no2}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">NH3</p>
      <h2 class="text-xl">${nh3}</h2>
    </div>
    <div class="item">
      <p class="text-center text-gray-400">O3</p>
      <h2 class="text-xl">${o3}</h2>
    </div>
  </div>
    `;
    })
    .catch(() => {
      alert("Failed to fetch Air Quality Index");
    });

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
      let { sunrise, sunset } = data.sys,
        { timeZone } = data;
      sRiseTime = moment
        .utc(sunrise, 'x')
        .add(timeZone, 'seconds')
        .format('hh:mm A');
      sSetTime = moment
        .utc(sunset, 'x')
        .add(timeZone, 'seconds')
        .format('hh:mm A')
      sunriseCard.innerHTML = `
      <div
      class="card-head flex items-center justify-between mb-[10px]"
    >
      <p>Sunrise & Sunset</p>
    </div>
    <div class="sunrise-sunset grid grid-cols-2">
      <div class="item flex items-center gap-[10px]">
        <div class="icon">
          <img
            class="w-[55px] mt-[15px]"
            src="./svg/sunrise-svgrepo-com.svg"
            alt=""
          />
        </div>
        <div>
          <p>Sunrise</p>
          <h2 class="">${sRiseTime}</h2>
        </div>
      </div>
      <div class="item flex items-center gap-[10px]">
        <div class="icon">
          <img
            class="w-[55px] mt-[15px]"
            src="./svg/sunset-svgrepo-com.svg"
            alt=""
          />
        </div>
        <div>
          <p>Sunset</p>
          <h2 class="">${sSetTime}</h2>
        </div>
      </div>
    </div>
      `;
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
      fiveDaysForecastCard.innerHTML = "";
      for (let i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
            <div
            class="forecast-item grid grid-cols-3 place-items-center mb-[15px]"
          >
            <div class="icon-wrapper flex items-center">
              <img src="https://openweathermap.org/img/wn/${
                fiveDaysForecast[i].weather[0].icon
              }.png" alt="">
              <span class="inline-block">${(
                fiveDaysForecast[i].main.temp - 273.15
              ).toFixed(2)}&deg;C</span>
            </div>
            <p class="text-gray-400">${date.getDate()} ${
          months[date.getMonth()]
        }</p>
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
