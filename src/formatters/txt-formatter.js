import _ from 'lodash';

const shift = '    ';

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.keys(value).map((key) => {
    const res = value[key];
    return `${key}: ${res}`;
  }).join('\n');
  const currentShift = shift.repeat(deep);
  return `{\n${currentShift}${shift}${result}\n${currentShift}}`;
};

const diffSymbols = {
  add: '  + ',
  remove: '  - ',
  same: shift,
};

const render = (parsedArray, deep = 0) => {
  const resultArray = parsedArray.reduce((acc, node) => {
    if (_.has(node, 'children')) {
      const currentShift = shift.repeat(deep + 1);
      const value = render(node.children, deep + 1);
      return [...acc, `${currentShift}${node.key}: {\n${value}\n${currentShift}}`];// ${diffSymbol}
    }
    const currentShift = shift.repeat(deep);

    if (node.diffType === 'changed') {
      const valueBefore = stringify(node.valueBefore, deep + 1);
      const valueAfter = stringify(node.valueAfter, deep + 1);
      return [
        ...acc,
        `${currentShift}${diffSymbols.remove}${node.key}: ${valueBefore}`,
        `${currentShift}${diffSymbols.add}${node.key}: ${valueAfter}`,
      ];
    }
    const strValue = stringify(node.value, deep + 1);
    const diffSymbol = diffSymbols[node.diffType];
    return [...acc, `${currentShift}${diffSymbol}${node.key}: ${strValue}`];
  }, []);

  const resultStr = resultArray.join('\n');
  return resultStr;
};

export default (parsedArray) => {
  const result = render(parsedArray);
  return `{\n${result}\n}`;
};
