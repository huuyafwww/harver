const getFileName = fileNamePath => {
    return require('path').basename(fileNamePath, '.js');
};

const getComponentName = Component => {
    return Component.wrappedComponent.name;
};

const getNowPageComponent = (nowPageLabel, Components) => {
    for (const Component of Components) {
        const ComponentName = getComponentName(Component);
        if (nowPageLabel === ComponentName) {
            return Component;
        }
    }
};

export { getFileName, getNowPageComponent };
