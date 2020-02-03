import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import compareData from './parsers';

const mapping = {
  yml: yaml.safeLoad,
  json: JSON.parse
};

export default (path1, path2) => {
  const dataBefore = fs.readFileSync(path1);
  const dataAfter = fs.readFileSync(path2);
  const extensionAfter = path.parse(path1).ext.toLowerCase().slice(1);
  const extensionBefore = path.parse(path2).ext.toLowerCase().slice(1);

  if(extensionAfter !== extensionBefore) {
    throw new Error('different extensions');
  }

  const objBefore = mapping[extensionAfter](dataBefore);
  const objAfter = mapping[extensionAfter](dataAfter);
  return compareData(objBefore, objAfter);
};
