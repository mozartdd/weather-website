const { DateTime } = require("luxon");

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
  const timeData = DateTime.now().setZone(weatherData.timezone);
  const current = weatherData.currentConditions;
  const future = weatherData.days;

  const dataObject = {
    address: weatherData.resolvedAddress,
    tempF: current.temp,
    tempC: fahrenheitToCelsius(current.temp),
    currentTime: timeData.hour + ':' + timeData.minute,
  };
  return dataObject;
}

// async function asyncChain(location) {
//   try {
//     const data = await getWeatherData(location);
//     document.querySelector('h1').innerText = data.tempC;
//   }
//   catch {

//   }
// }

function fahrenheitToCelsius(temp) {
  const celsius = ((temp - 32) * 5) / 9;
  return Number(celsius.toFixed(1));
}

// asyncChain('London')

