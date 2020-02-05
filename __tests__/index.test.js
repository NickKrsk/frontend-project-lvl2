import fs from 'fs';
import compareFiles from '../src';

test('compare JSON', () => {
  const pathToFile1 = `${__dirname}/../fixtures/after.json`;
  const pathToFile2 = `${__dirname}/../fixtures/before.json`;
  const pathToResult = `${__dirname}/../fixtures/result.json`;
  const expectedResult = fs.readFileSync(pathToResult, 'utf8', 'string');
  const result = compareFiles(pathToFile1, pathToFile2, 'json');
  // const resultObj = JSON.parse(compareFiles(pathToFile1, pathToFile2));
  expect(result).toEqual(expectedResult);
});

test('compare yaml', () => {
  const pathToFile1 = `${__dirname}/../fixtures/after.yml`;
  const pathToFile2 = `${__dirname}/../fixtures/before.yml`;
  const pathToResult = `${__dirname}/../fixtures/result.yml`;
  const expectedResult = fs.readFileSync(pathToResult, 'utf8', 'string');
  const result = compareFiles(pathToFile1, pathToFile2, 'yml');
  // console.log(result);
  // const resultObj = JSON.parse(result);
  expect(result).toEqual(expectedResult);
});

test('compare ini', () => {
  const pathToFile1 = `${__dirname}/../fixtures/after.ini`;
  const pathToFile2 = `${__dirname}/../fixtures/before.ini`;
  const pathToResult = `${__dirname}/../fixtures/result.ini`;
  const expectedResult = fs.readFileSync(pathToResult, 'utf8');
  const result = compareFiles(pathToFile1, pathToFile2, 'ini');
  // const resultObj = ini.parse(result);
  expect(result).toEqual(expectedResult, 'ini');
});
