const { DateTime } = require('luxon');
const dayjs = require('dayjs');

// Fetches weather api from visual crossing website
export async function getWeatherPromise(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=EWTMF5AFJGDJLKEQ4SE36PV85`;

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
    sunRise: getCurrentTime(current.sunrise),
    sunSet: getCurrentTime(current.sunset),
  };

  return dataObject;
}

export async function getFutureWeatherData(location, idx) {
  const weatherData = await getWeatherPromise(location);
  const future = weatherData.days;

  const futureDataObj = {
    futureConditions: future[idx].conditions,
    futureTempC: fahrenheitToCelsius(future[idx].temp),
    futureTempF: future[idx].temp,
    futureWindM: future[idx].windspeed,
    futureWindKm: milesToKm(future[idx].windspeed),
    futureDay: DateTime.fromISO(future[idx].datetime).toFormat('LLL dd')
  };
  return futureDataObj;
}

export function fahrenheitToCelsius(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}
export function milesToKm(miles) {
  return Math.round(miles * 1.60934);
}

// If hrs or minutes of time is smaller than 10 prefix it with 0
function getCurrentTime(location) {
  const timeData = DateTime.now().setZone(location);
  let hour = timeData.hour < 10 ? '0' + timeData.hour : timeData.hour;
  let minute = timeData.minute < 10 ? '0' + timeData.minute : timeData.minute;
  return hour + ':' + minute;
}

// console.log(dayjs().add(1, 'day').subtract(1, 'year').year(2009).toString());
