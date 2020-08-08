import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Sidebar from '@components/sidebar/';
import Main from '@components/main/';

const AppWrapper = styled.div``;

@inject('store')
@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const { store, pageSlug } = this.props;
        store.setPageSlug(pageSlug);
    }

    render() {
        return (
            <AppWrapper>
                <Sidebar />
                <Main />
            </AppWrapper>
        );
    }
}
