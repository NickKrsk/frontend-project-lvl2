import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import compareFiles from '../src';

test('compare JSON', () => {
  const pathToFile1 = __dirname + '/../fixtures/after.json';
  const pathToFile2 = __dirname + '/../fixtures/before.json';
  const pathToResult = __dirname + '/../fixtures/result.json';
  const expectedObject = JSON.parse(fs.readFileSync(pathToResult));
  compareFiles(pathToFile1, pathToFile2);
  const resultObj = JSON.parse(compareFiles(pathToFile1, pathToFile2));
  expect(resultObj).toEqual(expectedObject);
});

test('compare yaml', () => {
  const pathToFile1 = __dirname + '/../fixtures/after.yml';
  const pathToFile2 = __dirname + '/../fixtures/before.yml';
  const pathToResult = __dirname + '/../fixtures/result.yml';
  const expectedObject = yaml.safeLoad(fs.readFileSync(pathToResult));
  const result = compareFiles(pathToFile1, pathToFile2);
  //console.log(result);
  const resultObj = JSON.parse(result);
  expect(resultObj).toEqual(expectedObject);
});

test('compare ini', () => {
  const pathToFile1 = __dirname + '/../fixtures/after.ini';
  const pathToFile2 = __dirname + '/../fixtures/before.ini';
  const pathToResult = __dirname + '/../fixtures/result.ini';
  const expectedObject = ini.parse(fs.readFileSync(pathToResult));
  const result = compareFiles(pathToFile1, pathToFile2);
  const resultObj = ini.parse(result);
  expect(resultObj).toEqual(expectedObject);
});