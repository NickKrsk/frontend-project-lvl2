import fs from 'fs';
import path from 'path';
import compareFiles from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileSync = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  [getFixturePath('beforeDeep.json'), getFixturePath('afterDeep.json'), 'resultDeep.txt', 'json', 'txt'],
  [getFixturePath('beforeDeep.ini'), getFixturePath('afterDeep.ini'), 'resultDeep.txt', 'ini', 'txt'],
  [getFixturePath('beforeDeep.yml'), getFixturePath('afterDeep.yml'), 'resultDeep.txt', 'yml', 'txt'],
  [getFixturePath('beforeDeep.json'), getFixturePath('afterDeep.json'), 'resultPlain.txt', 'json', 'plain'],
  [getFixturePath('beforeDeep.json'), getFixturePath('afterDeep.json'), 'resultJSON.txt', 'json', 'json'],
];

test.each(cases)('Compare', (pathToFile1, pathToFile2, pathToResult, fileType, format) => {
  const expectedResult = readFileSync(pathToResult);
  const result = compareFiles(pathToFile1, pathToFile2, fileType, format);
  expect(result).toEqual(expectedResult);
});
