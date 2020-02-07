import _ from 'lodash';

const stringify = value => {

  if (typeof (value) !== 'object') {
    return value;
  }
  const result = Object.keys(value).reduce((acc, key) => {
    const res = value[key];
    return [...acc, `${key}: ${res}`];
  }, []).join('\n');
  return `{\n${result}\n}`;
};

const convertDiffTypeToSymbol = diffType => {
  switch(diffType) {
    case 'add':
      return '+';
    case 'remove':
      return '-';
    default:
      return ' ';
  }
};


const render = (parsedArray, deep = 1) => {
  const indent = "    ".repeat(deep);
  const resultArray = parsedArray.reduce((acc, node) => {
    const diffSymbol = convertDiffTypeToSymbol(node.diff);
    if (node.children.length > 0) {
      const deepValue = render(node.children, deep + 1);
      return [...acc, `${indent}${diffSymbol} ${node.name}: {\n${deepValue}\n}`];
    }
    const value = node.diff === 'remove' ? node.valueBefore : node.valueAfter;
    const strValue = stringify(value);

    if (node.diff !== 'changed') {
      return [...acc, `${indent}${diffSymbol} ${node.name}: ${strValue}`];
    }
    const valueBefore = stringify(node.valueBefore);
    const valueAfter = stringify(node.valueAfter);
    return [...acc, `${indent}- ${node.name}: ${valueBefore}`, `+ ${node.name}: ${valueAfter}`];
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
      diff: '',
      children: [],
    };

    if (!_.has(objBefore, key)) {
      // 1. key is not found in data1
      const valueAfter = objAfter[key];
      node.valueAfter = valueAfter;
      node.diff = 'add';

      if (typeof (valueAfter) === 'object') {
        node.children = parse(valueAfter, valueAfter);
      }
    } else if (!_.has(objAfter, key)) {
      // 2. key is not found in data2`;
      const valueBefore = objBefore[key]; 
      node.valueBefore = valueBefore;
      node.diff = 'remove';
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
        node.diff = valueAfter === valueBefore ? 'equals' : 'changed';
      } else if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
        node.diff = 'deep';
        const child = parse(valueBefore, valueAfter);
        node.children = child;
        //if (node.name === 'setting6') console.log(node.children);
      } else {
        node.diff = 'changed';
      }
    }
    return [...acc, node];
  }, []);
  //console.log(parsedArray);
  return parsedArray; // массив распарсенных узлов
};

export default (objBefore, objAfter) => {
  const parsedArray = parse(objBefore, objAfter);
  const result = render(parsedArray);
  const result1 = `{\n${result}\n}`;
  console.log(result1);
  return result1;
};
