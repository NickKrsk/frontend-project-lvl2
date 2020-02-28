import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const describers = {
  add: (propertyPath, node) => `Property '${propertyPath}' was added with value: ${stringify(node.value)}`,
  remove: (propertyPath) => `Property '${propertyPath}' was deleted`,
  changed: (propertyPath, node) => `Property '${propertyPath}' was changed from ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
  same: () => '',
};

const render = (parsedArray, path) => parsedArray.reduce((acc, node) => {
  if (_.has(node, 'children')) {
    const childComment = render(node.children, [...path, node.key]);
    return [...acc, childComment];
  }
  const propertyPath = [...path, node.key].join('.');
  const describe = describers[node.diffType](propertyPath, node);
  if (describe === '') {
    return acc;
  }
  return [...acc, describe];
}, []).join('\n');

export default (parsedArray) => render(parsedArray, []);
