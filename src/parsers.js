import _ from 'lodash';

const render = (parsedArray) => {
  if (parsedArray.length === 0) {
    console.log('empty');
    return '';
  }
  const resultArray = parsedArray.reduce((acc, node) => {
    if (node.diff === 'add') {
      acc.push(`+ ${node.name}: ${node.valueAfter}`);
    }

    if (node.diff === 'remove') {
      acc.push(`- ${node.name}: ${node.valueBefore}`);
    }

    if (node.diff === 'equals') {
      acc.push(`${node.name}: ${node.valueAfter}`);
    }
    
    if (node.children !== []) {
      const deepValue = render(node.children);
      acc.push(`    ${deepValue}`);
    }
    
    return acc;
  }, []);

  const resultStr = resultArray.join('\n');
  return `{\n${resultStr}\n}`;
};

const parse = (objBefore, objAfter) => {
  const allKeys = Object.keys({ ...objBefore, ...objAfter }).sort();
  //console.log(allKeys);
  const parsedArray = allKeys.reduce((acc, key) => {
    const node = {
      name: key,
      valueBefore: '',
      valueAfter: '',
      diff: '',
      children: [],
    };

    if (!_.has(objBefore, key)) {
      // 1. key is not found in data1
      const valueAfter = objAfter[key];
      node.valueAfter = valueAfter;
      node.diff = 'add';

      if (typeof (valueAfter) === 'object') {
        node.children.add(valueAfter);
      }
    } else if (!_.has(objAfter, key)) {
      // 2. key is not found in data2`;
      const valueBefore = objBefore[key]; 
      node.valueBefore = valueBefore;
      node.diff = 'remove';
      if (typeof (valueBefore) === 'object') {
        node.children.add(valueBefore);
      }
    } else if (objBefore[key] !== objAfter[key]) {
      // 3. key is found in both objects 
      // key a different in data1 and data2`);
      const valueAfter = objAfter[key];
      const valueBefore = objBefore[key];

      node.valueAfter = valueAfter;
      node.valueBefore = valueBefore;

      if (typeof (valueAfter) !== 'object' && typeof (valueAfter) !== 'object') {
        // flat
        node.diff = valueAfter === valueBefore ? 'equals' : 'changed';
      } else if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
        node.diff = 'deep';
        node.children = parse(valueBefore, valueAfter);
      } else {
        node.diff = 'changed';
      }
    }
    return [...acc, node];
  }, []);
  return parsedArray;
}

export default (objBefore, objAfter) => {

  const parsedArray = parse(objBefore, objAfter);
  const result = render(parsedArray);
  console.log(result);
  // const resultStr = JSON.stringify(resultJSON, null, ' ');
  return result;
};
