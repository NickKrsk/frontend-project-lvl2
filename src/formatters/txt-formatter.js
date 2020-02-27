import _ from 'lodash';

const shift = '    ';

const stringify = (value, deep) => {
  const currentShift = shift.repeat(deep);
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.keys(value).sort().reduce((acc, key) => {
    const res = value[key];
    return [...acc, `${key}: ${res}`];
  }, []).join('\n');
  return `{\n${currentShift}${shift}${result}\n${currentShift}}`;
};

const convertDiffTypeToSymbol = (diffType) => {
  switch (diffType) {
    case 'add':
      return '  + ';
    case 'remove':
      return '  - ';
    default:
      return '    ';
  }
};

const render = (parsedArray, deep = 0) => {
  const currentShift = shift.repeat(deep);
  const resultArray = parsedArray.map((acc, node) => {
    const diffSymbol = convertDiffTypeToSymbol(node.diffType);
    if (_.has(node, 'children') && node.children.length > 0) {
      const deepValue = render(node.children, deep + 1);
      return [...acc, `${currentShift}${diffSymbol}${node.name}: {\n${deepValue}\n${shift}${currentShift}}`];
    }
    const value = node.diffType === 'remove' ? node.valueBefore : node.valueAfter;
    const strValue = stringify(value);

    if (node.diffType !== 'changed') {
      return [...acc, `${currentShift}${diffSymbol}${node.name}: ${strValue}`];
    }
    const valueBefore = stringify(node.valueBefore, deep + 1);
    const valueAfter = stringify(node.valueAfter, deep + 1);
    return [...acc, `${currentShift}  - ${node.name}: ${valueBefore}`,
      `${currentShift}  + ${node.name}: ${valueAfter}`];
  }, []);

  const resultStr = resultArray.join('\n');
  return resultStr;
};

export default (parsedArray) => {
  const result = render(parsedArray);
  return `{\n${result}\n}`;
};
