const getFileName = fileNamePath => {
    return require('path').basename(fileNamePath, '.js');
};

export { getFileName };
