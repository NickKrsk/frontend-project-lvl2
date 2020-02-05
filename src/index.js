import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';// let ini = require('ini'); //

import compareData from './parsers';

const mapping = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (path1, path2, format) => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');

  const parse = mapping[format];
  const objBefore = parse(dataBefore);
  const objAfter = parse(dataAfter);
  return compareData(objBefore, objAfter);
};
