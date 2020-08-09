import { sizes } from '@config';
import { millisecond2second, date2time } from '@helpers/time';
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

const byte2SizeString = (byte, unit = 1024, roundDigit = 10) => {
    let size;
    for (size of sizes) {
        if (byte >= unit) {
            byte /= unit;
            continue;
        }
        break;
    }
    const roundedByte = Math.round(byte * roundDigit) / roundDigit;
    return `${roundedByte}${size}`;
};

export {
    getFileName,
    getComponentName,
    getNowPageComponent,
    byte2SizeString,
    millisecond2second,
    date2time,
};
