import _ from 'lodash';

const shift = '    ';

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.keys(value).map((key) => `${key}: ${value[key]}`).join('\n');
  const currentShift = shift.repeat(deep);
  return `{\n${currentShift}${shift}${result}\n${currentShift}}`;
};

const mapNode = {
  deep: (node, deep) => {
    const currentShift = shift.repeat(deep + 1);
    const value = render(node.children, deep + 1);
    return `${currentShift}${node.key}: {\n${value}\n${currentShift}}`;
  },
  changed: (node, deep) => {
    const currentShift = shift.repeat(deep);
    const valueBefore = stringify(node.valueBefore, deep + 1);
    const valueAfter = stringify(node.valueAfter, deep + 1);
    return `${currentShift}  - ${node.key}: ${valueBefore}\n${currentShift}  + ${node.key}: ${valueAfter}`;
  },
  add: (node, deep) => {
    const currentShift = shift.repeat(deep);
    const strValue = stringify(node.value, deep + 1);
    return `${currentShift}  + ${node.key}: ${strValue}`;
  },
  remove: (node, deep) => {
    const currentShift = shift.repeat(deep);
    const strValue = stringify(node.value, deep + 1);
    return `${currentShift}  - ${node.key}: ${strValue}`;
  },
  same: (node, deep) => {
    const currentShift = shift.repeat(deep + 1);
    const strValue = stringify(node.value, deep + 1);
    return `${currentShift}${node.key}: ${strValue}`;
  },
};

const render = (ast, deep = 0) => ast.map((node) => mapNode[node.diffType](node, deep)).join('\n');

export default (ast) => `{\n${render(ast)}\n}`;
