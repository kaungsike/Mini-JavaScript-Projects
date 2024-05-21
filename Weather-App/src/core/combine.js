
import { cityInput, searchBtn } from "./selectors";

export const  api_key = 'a0881255ef2e23cb25cdc2f2d5406bdf';

export const getWeatherDetail = (name, lat, lon, country, state) => {
    const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        console.log(data);
    }).catch(() => {
        alert('Failed to fetch current weather');
    })
}


export const getCityCoordinates = () => {
    let cityName = cityInput.value.trim();
    console.log(cityName);
    cityInput.value = "";
    if(!cityName) return;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        const {name, lat, lon, country, state} = data[0];
        getWeatherDetail (name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinate of ${cityName}`);
    });
}
