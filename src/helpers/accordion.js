import React from 'react';
import AccordionPanel from '@components/main/home/body/body/accordion';

const showDataLabels = ['request', 'response'];

const getMainHarViewAccordion = showDatas => {
    return showDataLabels.map((showDataLabel, key) => {
        const eventKey = String(key);
        const showData = showDatas[key];
        return (
            <AccordionPanel
                key={eventKey}
                eventKey={eventKey}
                showDataLabel={showDataLabel}
                showData={showData}
            />
        );
    });
};

export { getMainHarViewAccordion };
