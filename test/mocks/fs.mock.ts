import { stocks } from '../../src/inventory/__tests__/mockData';

const readFile = jest.fn().mockImplementation((path, err) => {
  if (err) {
    return Promise.reject(`stock.json could not be read from path ${path}`);
  }
  return Promise.resolve(stocks);
});

exports = { readFile };
