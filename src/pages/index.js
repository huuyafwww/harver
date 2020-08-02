import React from 'react';
import { Provider } from 'mobx-react';
import { Link } from 'gatsby';
import Store from '@stores';
import '@styles';
import { getFileName } from '@helpers';
import App from '@components';

const store = new Store();
const pageSlug = getFileName(__filename);

export default () => (
    <Link to="/">
        <Provider store={store}>
            <App pageSlug={pageSlug} />
        </Provider>
    </Link>
);
