import _ from 'lodash';

const shift = '    ';

const stringify = (value, deep) => {
  const currentShift = shift.repeat(deep);
  if (typeof (value) !== 'object') {
    return value;
  }
  const result = Object.keys(value).sort().reduce((acc, key) => {
    const res = value[key];
    return [...acc, `${key}: ${res}`];
  }, []).join('\n');
  return `{\n${currentShift}${shift}${result}\n${currentShift}}`;
};

const convertDiffTypeToSymbol = diffType => {
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
  const resultArray = parsedArray.reduce((acc, node) => {
    const diffSymbol = convertDiffTypeToSymbol(node.diffType);
    if (node.children.length > 0) {
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

export default (objBefore, objAfter) => {
  const parsedArray = parse(objBefore, objAfter);
  //console.log(parsedArray);
  const result = render(parsedArray);
  const result1 = `{\n${result}\n}`;
  console.log(result1);
  return result1;
};
