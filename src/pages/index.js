import React from 'react';
import { Provider } from 'mobx-react';
import Store from '@stores';
import App from '@components';

const store = new Store();

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
