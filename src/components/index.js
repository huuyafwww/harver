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
        this.state = {
            isOpenMenu: true,
        };
        const { store, pageSlug } = this.props;
        store.setPageSlug(pageSlug);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        const isOpenMenu = !this.state.isOpenMenu;
        this.setState({ isOpenMenu });
    }

    render() {
        return (
            <AppWrapper>
                <Sidebar isOpenMenu={this.state.isOpenMenu} />
                <Main
                    isOpenMenu={this.state.isOpenMenu}
                    toggleMenu={this.toggleMenu}
                />
            </AppWrapper>
        );
    }
}
