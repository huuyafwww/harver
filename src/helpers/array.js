const arrayKey2Column = (targetArray, searchArray) => {
    for (const searchKey of searchArray) {
        if (targetArray[searchKey]) {
            targetArray = targetArray[searchKey];
            continue;
        }
        return false;
    }
    return targetArray;
};

export { arrayKey2Column };
