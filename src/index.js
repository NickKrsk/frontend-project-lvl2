import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';// let ini = require('ini'); //

import compareData from './parsers';
import jsonRender from './formatters/json-formater';
import plainRender from './formatters/plain-formatter';

const mappingFileType = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const mappingFormat = {
  json: jsonRender,
  plain: plainRender,
};

export default (path1, path2, fileType, format = 'json') => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');

  const parse = mappingFileType[fileType];
  const objBefore = parse(dataBefore);
  const objAfter = parse(dataAfter);
  const render = mappingFormat[format];
  return render(compareData(objBefore, objAfter));
};
