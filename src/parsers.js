import _ from 'lodash';

const render = (parsedArray) => {
  if (parsedArray.length === 0) {
    console.log('empty');
    return '';
  }
  const resultArray = parsedArray.reduce((acc, el) => {
    const currentDiff = el.diff === '' ? '    ' : `  ${el.diff} `;
    acc.push(`${currentDiff}${el.name}: ${el.value}`);
    return acc;
  }, []);

  const resultStr = resultArray.join('\n');
  return `{\n${resultStr}\n}`;
};

export default (objBefore, objAfter) => {
  const allKeys = Object.keys({ ...objBefore, ...objAfter }).sort();
  const parsedArray = allKeys.reduce((acc, key) => {
    if (!_.has(objBefore, key)) {
      // key not found in data1
      // acc[`+ ${key}`] = objAfter[key];
      acc.push({
        name: key,
        value: objAfter[key],
        diff: '+',
      });
    } else if (!_.has(objAfter, key)) {
      // key not found in data2`);
      // acc[`- ${key}`] = objBefore[key];
      acc.push({
        name: key,
        value: objBefore[key],
        diff: '-',
      });
    } else if (objBefore[key] !== objAfter[key]) {
      // key a different in data1 and data2`);
      // acc[`- ${key}`] = objBefore[key];
      // acc[`+ ${key}`] = objAfter[key];
      acc.push({
        name: key,
        value: objBefore[key],
        diff: '-',
      });
      acc.push({
        name: key,
        value: objAfter[key],
        diff: '+',
      });
    } else {
      // equals;
      // acc[key] = objBefore[key];
      acc.push({
        name: key,
        value: objAfter[key],
        diff: '',
      });
    }
    return acc;
  }, []);
  const result = render(parsedArray);
  console.log(result);
  // const resultStr = JSON.stringify(resultJSON, null, ' ');
  return result;
};
