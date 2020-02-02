import fs from 'fs';
import compareFiles from '../src';

test('compare JSON', () => {
  const pathToFile1 = __dirname + '/../fixtures/after.json';
  const pathToFile2 = __dirname + '/../fixtures/before.json';
  const pathToResult = __dirname + '/../fixtures/result.json';
  const objAfter = JSON.parse(fs.readFileSync(pathToFile1));
  const objBefore = JSON.parse(fs.readFileSync(pathToFile2));
  const expectedResult = JSON.parse(fs.readFileSync(pathToResult));

  const resultObj = JSON.parse(compareFiles(pathToFile1, pathToFile2));
  expect(resultObj).toEqual(expectedResult);
});

test('compare yaml', () => {

});