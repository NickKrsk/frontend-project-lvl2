import fs from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  
    console.log('index');
    const objBefore = JSON.parse(fs.readFileSync(path1));
    const objAfter = JSON.parse(fs.readFileSync(path2));
    console.log(objBefore);
    console.log(objAfter);

    const allKeys = Object.keys({ ...objBefore, ...objAfter });

    console.log(allKeys);
    const result = allKeys.reduce((acc, key) => {
        if (!_.has(objBefore, key)) {
            //console.log(`key ${key} not found in data1`);
            acc[`+ ${key}`] = objAfter[key];
        } else if (!_.has(objAfter, key)) {
            //console.log(`key ${key} not found in data2`);
            acc[`- ${key}`] = objBefore[key];
        } else if (objBefore[key] !== objAfter[key]) {
            //console.log(`key ${key} a different in data1 and data2`);
            acc[`- ${key}`] = objBefore[key];
            acc[`+ ${key}`] = objAfter[key];
        } else {
            //console.log(`key ${key} is ok`);
            acc[key] = objBefore[key];
        }
        return acc;
    }, {});

    console.log(result);
} 
