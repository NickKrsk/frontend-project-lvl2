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

const getChildren = (objBefore, objAfter, key) => {
  const valueBefore = objBefore[key];
  const valueAfter = objAfter[key];

  if (!_.has(objBefore, key)) {
    // 1. key was not found in data1 (add)
    return compareObjects(valueAfter, valueAfter);
  }

  if (!_.has(objAfter, key)) {
    // 2. key was not found in data2` (remove);
    return compareObjects(valueBefore, valueBefore);
  }

  // 3. key was found in both objects
  return compareObjects(valueBefore, valueAfter);
};

const compareObjects = (objBefore, objAfter) => {
  if (!_.isObject(objBefore) || !_.isObject(objAfter)) {
    return [];
  }

  const keys = _.union(_.keys(objBefore), _.keys(objAfter)).sort();
  return keys.map((key) => {
    if (!_.has(objBefore, key)) {
      // 1. key was not found in data1 (add)
      const valueAfter = objAfter[key];
      const node = {
        name: key,
        valueBefore: '',
        valueAfter,
        diffType: 'add',
        children: [],
      };
      return node;
    }

    if (!_.has(objAfter, key)) {
      // 2. key was not found in data2` (remove);
      const valueBefore = objBefore[key];
      const node = {
        name: key,
        valueBefore,
        valueAfter: '',
        diffType: 'remove',
        children: [],
      };
      return node;
    }


    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];
    const diffType = getDiffType(valueBefore, valueAfter);
    const children = getChildren(objBefore, objAfter, key);

    const node = {
      name: key,
      valueBefore,
      valueAfter,
      diffType,
      children,
    };
    return node;
  });
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
