import React from 'react';
import { Link } from 'gatsby';
import '@styles';
import { getFileName } from '@helpers';
import App from '@components';

const page = getFileName(__filename);

export default () => (
    <Link to="/">
        <App pageName={page} />
    </Link>
);
