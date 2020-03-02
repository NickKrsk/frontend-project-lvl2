import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getPropertyPath = (node, path) => [...path, node.key].join('.');

const mapNode = {
  deep: (node, path) => render(node.children, [...path, node.key]),
  add: (node, path) => `Property '${getPropertyPath(node, path)}' was added with value: ${stringify(node.value)}`,
  remove: (node, path) => `Property '${getPropertyPath(node, path)}' was deleted`,
  changed: (node, path) => `Property '${getPropertyPath(node, path)}' was changed from ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
  same: () => null,
};

const render = (parsedArray, path) => parsedArray.map((node) => mapNode[node.diffType](node, path))
  .filter((el) => el)
  .join('\n');

export default (ast) => render(ast, []);
