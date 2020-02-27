import fs from 'fs';
import { extname } from 'path';
import _ from 'lodash';
import parse from './parsers';
import txtRender from './formatters/txt-formatter';
import plainRender from './formatters/plain-formatter';
import jsonRender from './formatters/json-formatter';

const compareObjects = (objBefore, objAfter) => {
  if (!_.isObject(objBefore) || !_.isObject(objAfter)) {
    return [];
  }

  const keys = _.union(_.keys(objBefore), _.keys(objAfter)).sort();
  return keys.map((key) => {
    if (!_.has(objBefore, key)) {
      // 1. key was not found in data1 (add)
      return {
        key,
        valueBefore: '',
        valueAfter: objAfter[key],
        diffType: 'add',
      };
    }

    if (!_.has(objAfter, key)) {
      // 2. key was not found in data2` (remove);
      return {
        key,
        valueBefore: objBefore[key],
        valueAfter: '',
        diffType: 'remove',
      };
    }

    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      // 3. has children
      const children = compareObjects(valueBefore, valueAfter);
      return {
        key,
        valueBefore,
        valueAfter,
        diffType: 'deep',
        children,
      };
    }

    if (valueBefore === valueAfter) {
      return {
        key,
        valueBefore,
        valueAfter,
        diffType: 'same',
      };
    }

    return {
      key,
      valueBefore,
      valueAfter,
      diffType: 'changed',
    };
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
