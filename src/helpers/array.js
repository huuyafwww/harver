import { bindMethods } from '@config/binds';

const arrayKey2Column = (targetArray, searchArray) => {
    for (const searchKey of searchArray) {
        if (targetArray.hasOwnProperty(searchKey)) {
            targetArray = targetArray[searchKey];
            continue;
        }
        return false;
    }
    return targetArray;
};

const getBinds = filename => {
    return arrayKey2Column(bindMethods, filename.split('/'));
};

export { arrayKey2Column, getBinds };
