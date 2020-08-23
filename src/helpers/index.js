import React from 'react';
import { sizes } from '@config';
import { arrayKey2Column } from '@helpers/array';
import { ms2s, date2time } from '@helpers/time';
import { getMainHarViewAccordion } from '@helpers/accordion';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const DisplayText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

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

const getTooltip = (displayText, overlayText = false) => {
    if (!overlayText) overlayText = displayText;
    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{overlayText}</Tooltip>}
        >
            <DisplayText>{displayText}</DisplayText>
        </OverlayTrigger>
    );
};

export {
    getFileName,
    getComponentName,
    getNowPageComponent,
    byte2SizeString,
    ms2s,
    date2time,
    getTooltip,
    getMainHarViewAccordion,
    arrayKey2Column,
};
