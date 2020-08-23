import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import '@styles';
import Sidebar from '@components/sidebar/';
import Main from '@components/main/';

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
        this.store = this.props.store;
        this.toggleMenu = this.toggleMenu.bind(this);
        this.onGetSettings = this.onGetSettings.bind(this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.send('getSettings');
        this.ipcRenderer.on('getSettingsResult', this.onGetSettings);
        this.store.setIpcRenderer(this.ipcRenderer);
    }

    onGetSettings(event, datas) {
        datas !== undefined && this.store.setSettings(datas);
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
