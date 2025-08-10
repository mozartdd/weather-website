export async function getWeatherPromise(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L`;

  try {
    const result = await fetch(url);
    const data = await result.json();

    return data;

  } catch (error) {
    return null;
  }
}

console.log(typeof getWeatherPromise('Riga, Latvia'));