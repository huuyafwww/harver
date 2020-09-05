import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import styled from 'styled-components';
import '@styles';
import Sidebar from '@components/sidebar/';
import Main from '@components/main/';

const bindMethods = getBinds(__filename);

const AppWrapper = styled.div`
    user-select: text;
    cursor: auto;
`;

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
        this.event = binds(bindMethods, this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.send('getSettings');
        this.ipcRenderer.on('getSettingsResult', this.event.onGetSettings);
        this.props.store.setIpcRenderer(this.ipcRenderer);
    }

    onGetSettings(event, datas) {
        datas !== undefined && this.props.store.setSettings(datas);
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
                    toggleMenu={this.event.toggleMenu}
                />
            </AppWrapper>
        );
    }
}
