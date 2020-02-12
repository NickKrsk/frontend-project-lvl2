
export default (parsedArray) => {
 /* const result = parsedArray.reduce((acc, val) => {
    return [...acc, JSON.stringify(val)];
  }, []);
  return result.join('');
  */
 return JSON.stringify(parsedArray);
};
