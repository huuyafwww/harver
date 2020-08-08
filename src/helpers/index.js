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

const millisecond2second = (
    millisecond,
    secondDigit = 1000,
    roundDigit = 100
) => {
    return Math.round((millisecond / secondDigit) * roundDigit) / roundDigit;
};

export { getFileName, getNowPageComponent, millisecond2second };
