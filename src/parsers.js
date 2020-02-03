import _ from 'lodash';

export default (objBefore, objAfter) => {
  const allKeys = Object.keys({ ...objBefore, ...objAfter });
  const resultJSON = allKeys.reduce((acc, key) => {
    if (!_.has(objBefore, key)) {
      // key not found in data1
      acc[`+ ${key}`] = objAfter[key];
    } else if (!_.has(objAfter, key)) {
      // key not found in data2`);
      acc[`- ${key}`] = objBefore[key];
    } else if (objBefore[key] !== objAfter[key]) {
      // key a different in data1 and data2`);
      acc[`- ${key}`] = objBefore[key];
      acc[`+ ${key}`] = objAfter[key];
    } else {
      // equals;
      acc[key] = objBefore[key];
    }
    return acc;
  }, {});
  const resultStr = JSON.stringify(resultJSON, null, ' ');
  return resultStr;
};
