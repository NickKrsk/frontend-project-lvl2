import _ from 'lodash';

const parse = (objBefore, objAfter) => {
  const allKeys = Object.keys({ ...objBefore, ...objAfter }).sort();
  const parsedArray = allKeys.reduce((acc, key) => {
    const node = {
      name: key,
      valueBefore: '',
      valueAfter: '',
      diffType: '',
      children: [],
    };

    if (!_.has(objBefore, key)) {
      // 1. key is not found in data1
      const valueAfter = objAfter[key];
      node.valueAfter = valueAfter;
      node.diffType = 'add';

      if (typeof (valueAfter) === 'object') {
        node.children = parse(valueAfter, valueAfter);
      }
    } else if (!_.has(objAfter, key)) {
      // 2. key is not found in data2`;
      const valueBefore = objBefore[key];
      node.valueBefore = valueBefore;
      node.diffType = 'remove';
      if (typeof (valueBefore) === 'object') {
        node.children = parse(valueBefore, valueBefore);
      }
    } else {
      // 3. key is found in both objects 
      // key a different in data1 and data2`);
      const valueAfter = objAfter[key];
      const valueBefore = objBefore[key];

      node.valueAfter = valueAfter;
      node.valueBefore = valueBefore;

      if (typeof (valueAfter) !== 'object' && typeof (valueAfter) !== 'object') {
        // flat
        node.diffType = valueAfter === valueBefore ? 'equals' : 'changed';
      } else if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
        node.diff = 'deep';
        const child = parse(valueBefore, valueAfter);
        node.children = child;
        //if (node.name === 'setting6') console.log(node.children);
      } else {
        node.diffType = 'changed';
      }
    }
    return [...acc, node];
  }, []);
  //console.log(parsedArray);
  return parsedArray; // массив распарсенных узлов
};

export default (objBefore, objAfter) => parse(objBefore, objAfter);
