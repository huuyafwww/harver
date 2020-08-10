import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import HomeCardBody from '@components/main/home/body';

const HomeWrapper = styled.div``;

@inject('store')
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HomeWrapper>
                <HomeCardBody />
            </HomeWrapper>
        );
    }
}
