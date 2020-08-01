import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '@components/sidebar/';

const AppWrapper = styled.div``;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <AppWrapper>
                <Sidebar />
            </AppWrapper>
        );
    }
}
