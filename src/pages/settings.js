import React from 'react';
import { Provider } from 'mobx-react';
import Store from '@stores';
import '@styles';
import { getFileName } from '@helpers';
import App from '@components';

const store = new Store();
const pageSlug = getFileName(__filename);

export default () => (
    <Provider store={store}>
        <App pageSlug={pageSlug} />
    </Provider>
);
