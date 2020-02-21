import fs from 'fs';
import { extname } from 'path';
import _ from 'lodash';
import parse from './parsers';
import txtRender from './formatters/txt-formatter';
import plainRender from './formatters/plain-formatter';
import jsonRender from './formatters/json-formatter';

const getDiffType = (valueBefore, valueAfter) => {
  if (valueBefore === undefined) {
    return 'add';
  }
  if (valueAfter === undefined) {
    return 'remove';
  }
  if (!_.isObject(valueBefore) && !_.isObject(valueAfter)) {
    return valueAfter === valueBefore ? 'equals' : 'changed';
  }
  if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
    return 'deep';
  }
  return 'changed';
};

const compareObjects = (objBefore, objAfter) => {
  if (!_.isObject(objBefore) || !_.isObject(objAfter)) {
    return [];
  }

  const keys = _.union(_.keys(objBefore), _.keys(objAfter)).sort();
  return keys.reduce((acc, key) => {
    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];
    const diffType = getDiffType(valueBefore, valueAfter);
    if (!_.has(objBefore, key)) {
      // 1. key was not found in data1 (add)
      const children = compareObjects(valueAfter, valueAfter);
      //return [...acc, node];
    }

    if (!_.has(objAfter, key)) {
      // 2. key was not found in data2` (remove);
      const children = compareObjects(valueBefore, valueBefore);
      //return [...acc, node];
    }
    // 3. key was found in both objects
    const children = compareObjects(valueBefore, valueAfter);

    const node = {
      name: key,
      valueBefore,
      valueAfter,
      diffType,
      children,
    };
    return [...acc, node];
  }, []);
};

const renders = {
  txt: txtRender,
  plain: plainRender,
  json: jsonRender,
};

const getExtName = (filePath) => extname(filePath).slice(1);

export default (path1, path2, format = 'txt') => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const extBefore = getExtName(path1);
  const objBefore = parse(dataBefore, extBefore);

  const dataAfter = fs.readFileSync(path2, 'utf8');
  const extAfter = getExtName(path2);
  const objAfter = parse(dataAfter, extAfter);

  const render = renders[format];
  return render(compareObjects(objBefore, objAfter));
};
