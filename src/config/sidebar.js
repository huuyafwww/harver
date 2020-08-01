import React from 'react';
import { FaHome } from 'react-icons/fa';

const Config = {
    info: {
        pcName: 'Harver',
        spName: 'Harv',
    },
    menu: {
        Dashboard: [
            {
                label: 'Home',
                link: 'index',
                icon: <FaHome />,
            },
        ],
    },
};

export { Config };
