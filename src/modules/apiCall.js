const { DateTime } = require('luxon');

// Fetches weather api from visual crossing website
export async function getWeatherPromise(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L`;

  try {
    const result = await fetch(url);
    const data = await result.json();

    return data;
  } catch (error) {
    throw new Error('Error while trying to get weather promise.');
  }
}

// Stores weather data in weather object
export async function getWeatherData(location) {
  const weatherData = await getWeatherPromise(location);
  const current = weatherData.currentConditions;
  const future = weatherData.days;

  const dataObject = {
    address: weatherData.resolvedAddress,
    tempF: current.temp,
    tempC: fahrenheitToCelsius(current.temp),
    currentTime: getCurrentTime(weatherData.timezone),
    conditions: current.conditions,
    feelsLikeF: current.feelslike,
    feelsLikeC: fahrenheitToCelsius(current.feelslike),
    description: weatherData.description,
    cloudCover: current.cloudcover,
    windM: current.windspeed,
    windKm: milesToKm(current.windspeed),
    humidity: current.humidity,
    visibility: current.visibility,
  };

  console.log(weatherData);
  return dataObject;
}

function fahrenheitToCelsius(temp) {
  const celsius = ((temp - 32) * 5) / 9;
  return Math.floor(celsius);
}
function milesToKm(miles) {
  const km = miles * 1.60934;
  return Math.floor(km);
}

// If hrs or minutes of time is smaller than 10 prefix it with 0
function getCurrentTime(location) {
  const timeData = DateTime.now().setZone(location);
  let hour = timeData.hour < 10 ? '0' + timeData.hour : timeData.hour;
  let minute = timeData.minute < 10 ? '0' + timeData.minute : timeData.minute;
  return hour + ':' + minute;
}
