const getDescribe = diffType => {
  switch (diffType) {
    case 'add':
      return 'was added';
    case 'remove':
      return 'was deleted';
    default:
      return '';
  }
};

const parse = (parsedArray) => {
  return parsedArray.reduce((acc, node) => {
    const describe = getDescribe(node.diffType);
    const comment = `Property '${node.name}' ${describe}`;
    return [...acc, comment];
  }, []).join('\n');
};

export default (parsedArray) => parse(parsedArray);
