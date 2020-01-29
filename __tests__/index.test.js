import sum from '../src';

test('sum', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(3, 4)).toEqual(7);
});