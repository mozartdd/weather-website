import { getWeatherPromise } from './apiCall.js';

describe('Weather api tests', () => {
  test('Unsuccessful weather api call', async () => {
    const promise = await getWeatherPromise('Fake known location');

    expect(promise).toBeNull();
  });
});
