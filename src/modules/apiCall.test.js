import { getWeatherData, fahrenheitToCelsius, milesToKm } from './apiCall.js';

global.fetch = jest.fn();

describe('getWeatherData', () => {
  it('should return formatted weather data', async () => {
    // Mock fetch response
    fetch.mockResolvedValueOnce({
      json: async () => ({
        resolvedAddress: 'Test City',
        timezone: 'America/New_York',
        currentConditions: {
          temp: 68,
          feelslike: 70,
          conditions: 'Clear',
          cloudcover: 20,
          windspeed: 5,
          humidity: 50,
          visibility: 10,
        },
        description: 'Sunny and warm',
      }),
    });

    const data = await getWeatherData('Test City');

    expect(data.address).toBe('Test City');
    expect(data.tempC).toBeCloseTo(20); // Celsius conversion
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Helper function tests', () => {
  it('Should covert fahrenheit to celsius correctly', () => {
    expect(fahrenheitToCelsius(100)).toEqual(38);
  });
  it('Should covert fahrenheit to celsius correctly', () => {
    expect(fahrenheitToCelsius(50)).toEqual(10);
  });
  it('Should convert miles to km correctly', () => {
    expect(milesToKm(100)).toBe(161);
  });
});
