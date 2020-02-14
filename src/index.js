import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

import compareData from './parsers';
import txtRender from './formatters/txt-formatter';
import plainRender from './formatters/plain-formatter';
import jsonRender from './formatters/json-formatter';

const mappingFileType = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const mappingFormat = {
  txt: txtRender,
  plain: plainRender,
  json: jsonRender,
};

export default (path1, path2, fileType = 'json', format = 'txt') => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');

  const parse = mappingFileType[fileType];
  const objBefore = parse(dataBefore);
  const objAfter = parse(dataAfter);
  const render = mappingFormat[format];
  return render(compareData(objBefore, objAfter));
};
