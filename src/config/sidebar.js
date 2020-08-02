import React from 'react';
import { FaHome } from 'react-icons/fa';

const Config = {
    info: {
        pcName: 'Harver',
        spName: 'Harv',
    },
    menu: [
        {
            label: 'Dashboard',
            isMenuItemHeader: true,
        },
        {
            label: 'Home',
            slug: 'index',
            link: 'index',
            icon: <FaHome />,
            isMenuItemHeader: false,
        },
    ],
};

export { Config };
