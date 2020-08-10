import React from 'react';
import { FaHome, FaRegSun } from 'react-icons/fa';

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
            link: '/',
            icon: <FaHome />,
            isMenuItemHeader: false,
        },
        {
            label: 'Settings',
            slug: 'settings',
            link: '/settings',
            icon: <FaRegSun />,
            isMenuItemHeader: false,
        },
    ],
};

export { Config };
