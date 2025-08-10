import { getWeatherPromise } from './apiCall.js';

describe('Weather api tests', () => {
  it('Unsuccessful weather api call', async () => {
    const promise = await getWeatherPromise('Fake known location');

    expect(promise).toBeNull();
  });
})