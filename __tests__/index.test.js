import fs from 'fs';
import path from 'path';
import compareFiles from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileSync = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['json', 'txt', 'result.txt'],
  ['ini', 'txt', 'result.txt'],
  ['yml', 'txt', 'result.txt'],
  ['json', 'plain', 'result-plain.txt'],
  ['json', 'json', 'result-json.txt'],
];

test.each(cases)('Compare', (extension, format, pathToResult) => {
  const expectedResult = readFileSync(pathToResult);
  const pathToFile1 = getFixturePath(`before.${extension}`);
  const pathToFile2 = getFixturePath(`after.${extension}`);
  const result = compareFiles(pathToFile1, pathToFile2, format);
  //console.log(result);
  expect(result).toEqual(expectedResult);
});
