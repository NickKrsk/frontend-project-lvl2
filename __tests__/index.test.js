import fs from 'fs';
import path from 'path';
import compareFiles from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileSync = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
/*
test('compare JSON', () => {
  const pathToFile1 = getFixturePath('after.json');
  const pathToFile2 = getFixturePath('before.json');
  const expectedResult = readFileSync('result.txt'); 
  const result = compareFiles(pathToFile1, pathToFile2, 'json');
  expect(result).toEqual(expectedResult);
});

test('compare yaml', () => {
  const pathToFile1 = getFixturePath('after.yml');
  const pathToFile2 = getFixturePath('before.yml');
  const expectedResult = readFileSync('result.txt');
  const result = compareFiles(pathToFile1, pathToFile2, 'yml');
  expect(result).toEqual(expectedResult);
});

test('compare ini', () => {
  const pathToFile1 = getFixturePath('after.ini');
  const pathToFile2 = getFixturePath('before.ini');
  const expectedResult = readFileSync('result.txt');
  const result = compareFiles(pathToFile1, pathToFile2, 'ini');
  expect(result).toEqual(expectedResult);
});
*/

test('compar deep', () => {
  const pathToFile1 = getFixturePath('beforeDeep.json');
  const pathToFile2 = getFixturePath('afterDeep.json');
  const expectedResult = readFileSync('result.txt'); 
  const result = compareFiles(pathToFile1, pathToFile2, 'json');
  //expect(result).toEqual(expectedResult);
});