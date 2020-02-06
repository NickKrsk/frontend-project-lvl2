import _ from 'lodash';

const render = (parsedArray) => {
  if (parsedArray.length === 0) {
    console.log('empty');
    return '';
  }
  const resultArray = parsedArray.reduce((acc, node) => {
    const currentDiff = node.diff === '' ? '    ' : `  ${node.diff} `;
    acc.push(`${currentDiff}${node.name}: ${node.value}`);
    return acc;
  }, []);

  const resultStr = resultArray.join('\n');
  return `{\n${resultStr}\n}`;
};

export default (objBefore, objAfter) => {
  const allKeys = Object.keys({ ...objBefore, ...objAfter }).sort();
  const parsedArray = allKeys.reduce((acc, key) => {
    const node = {
      name: key,
      diff: '',
    };

    if (!_.has(objBefore, key)) {
      // 1. key is not found in data1
      node.value = objAfter[key];
      node.diff = 'add';

      if(typeof (valueAfter) === 'object') {
        node.children = valueAfter;
      }
    } else if (!_.has(objAfter, key)) {
      // 2. key is not found in data2`;
      node.value = objBefore[key];
      node.diff = 'remove';
      if (typeof (valueBefore) === 'object') {
        node.children = valueBefore;
      }
    } else if (objBefore[key] !== objAfter[key]) {
      // 3. key is found in both objects 
      // key a different in data1 and data2`);
      const valueAfter = objAfter[key];
      const valueBefore = objBefore[key];

      if(valueBefore !== 'object' && valueAfter !== 'object') {
      // flat
        if(valueBefore !== valueAfter) {
          node.diff = 'changed';   
          node.value = valueBefore; 
        }
      }
    }
    acc.push(node);
    return acc;
  }, []);
  const result = render(parsedArray);
  console.log(result);
  // const resultStr = JSON.stringify(resultJSON, null, ' ');
  return result;
};
