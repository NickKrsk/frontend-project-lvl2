import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getDescribe = (node, propertyPath) => {
  const valueBefore = stringify(node.valueBefore);
  const valueAfter = stringify(node.valueAfter);
  switch (node.diffType) {
    case 'add':
      return `Property '${propertyPath}' was added with value: ${valueAfter}`;
    case 'remove':
      return `Property '${propertyPath}' was deleted`;
    case 'changed':
      return `Property '${propertyPath}' was changed from ${valueBefore} to ${valueAfter}`;
    default:
      return '';
  }
};

const render = (parsedArray, path) => parsedArray.reduce((acc, node) => {
  if (node.children.length > 0 && node.diffType !== 'add' && node.diffType !== 'remove') {
    const childComment = render(node.children, [...path, node.name]);
    return [...acc, childComment];
  }
  const propertyPath = [...path, node.name].join('.');
  const describe = getDescribe(node, propertyPath);
  if (describe === '') {
    return acc;
  }
  return [...acc, describe];
}, []).join('\n');

export default (parsedArray) => render(parsedArray, []);
