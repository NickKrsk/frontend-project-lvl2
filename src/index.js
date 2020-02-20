import fs from 'fs';
import _ from 'lodash';
import parse from './parsers';
import txtRender from './formatters/txt-formatter';
import plainRender from './formatters/plain-formatter';
import jsonRender from './formatters/json-formatter';

const compareObjects = (objBefore, objAfter) => {
  if (!_.isObject(objBefore) || !_.isObject(objAfter)) {
    return [];
  }

  const keys = _.union(_.keys(objBefore), _.keys(objAfter));
  return keys.sort().reduce((acc, key) => {
    const node = {
      name: key,
    };

    if (!_.has(objBefore, key)) {
      // 1. key was not found in data1
      const valueAfter = objAfter[key];
      node.valueAfter = valueAfter;
      node.valueBefore = '';
      node.diffType = 'add';
      node.children = compareObjects(valueAfter, valueAfter);
      return [...acc, node];
    }

    if (!_.has(objAfter, key)) {
      // 2. key was not found in data2`;
      const valueBefore = objBefore[key];
      node.valueAfter = '';
      node.valueBefore = valueBefore;
      node.diffType = 'remove';
      node.children = compareObjects(valueBefore, valueBefore);
      return [...acc, node];
    }

    // 3. key was found in both objects
    const valueAfter = objAfter[key];
    const valueBefore = objBefore[key];

    node.valueAfter = valueAfter;
    node.valueBefore = valueBefore;
    node.children = compareObjects(valueBefore, valueAfter);

    if (typeof (valueAfter) !== 'object' && typeof (valueAfter) !== 'object') {
      node.diffType = valueAfter === valueBefore ? 'equals' : 'changed';
    } else if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
      node.diffType = 'deep';
    } else {
      node.diffType = 'changed';
    }
    return [...acc, node];
  }, []);
};

const renders = {
  txt: txtRender,
  plain: plainRender,
  json: jsonRender,
};

export default (path1, path2, fileType = 'json', format = 'txt') => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');

  const objBefore = parse(dataBefore, fileType);
  const objAfter = parse(dataAfter, fileType);
  const render = renders[format];
  return render(compareObjects(objBefore, objAfter));
};
