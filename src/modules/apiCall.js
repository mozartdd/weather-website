const { DateTime } = require('luxon');

// Fetches weather api from visual crossing website
export async function getWeatherPromise(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L`;

  try {
    const result = await fetch(url);
    if (!result.ok) throw new Error(`HTTP ${result.status}`);

    const data = await result.json();

    return data;
  } catch (error) {
    logError(error);
  }
}

// Stores weather data in weather object
export async function getWeatherData(location) {
  try {
    const weatherData = await getWeatherPromise(location);
    if (!weatherData?.currentConditions) throw new Error('No current weather data');

    const { currentConditions: c, resolvedAddress, description, timezone } = weatherData;
    
    return {
      address: resolvedAddress,
      tempF: c.temp,
      tempC: fahrenheitToCelsius(c.temp),
      feelsLikeF: c.feelslike,
      feelsLikeC: fahrenheitToCelsius(c.feelslike),
      currentTime: getCurrentTime(timezone),
      conditions: c.conditions,
      description,
      cloudCover: c.cloudcover,
      windM: c.windspeed,
      windKm: milesToKm(c.windspeed),
      humidity: c.humidity,
      visibility: c.visibility,
      sunrise: c.sunrise,
      sunset: c.sunset,
      icon: c.icon
    };
  } catch (error) {
    logError(error);
  }
}

export async function getFutureWeatherData(location, idx) {
  try {
    const weatherData = await getWeatherPromise(location);
    const f = weatherData.days; // f === future
    if (!f[idx]) throw new Error(`No data for day index ${idx}`);

    const fDataObj = {
      fConditions: f[idx].conditions,
      fTempC: fahrenheitToCelsius(f[idx].temp),
      fTempF: f[idx].temp,
      fWindM: f[idx].windspeed,
      fWindKm: milesToKm(f[idx].windspeed),
      fDay: DateTime.fromISO(f[idx].datetime).toFormat('LLL dd'),
      icon: f[idx].icon,
    };
    return fDataObj;
  } catch (error) {
    logError(error);
  }
}

export function fahrenheitToCelsius(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}
export function milesToKm(miles) {
  return Math.round(miles * 1.60934);
}

// If hrs or minutes of time is smaller than 10 prefix it with 0
function getCurrentTime(timezone) {
  const timeData = DateTime.now().setZone(timezone);
  let hour = timeData.hour < 10 ? '0' + timeData.hour : timeData.hour;
  let minute = timeData.minute < 10 ? '0' + timeData.minute : timeData.minute;
  return hour + ':' + minute;
}

function logError(error) {
  console.error('Error fetching weather details:', error);
}
