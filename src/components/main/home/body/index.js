import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
const { ipcRenderer } = window.require('electron');

@inject('store')
@observer
export default class HomeCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
        this.store = this.props.store;
        this.onIpc = this.onIpc.bind(this);
        this.setHarFileData = this.setHarFileData.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('fileData', this.onIpc);
    }

    onIpc(event, harFileData) {
        harFileData !== undefined && this.setHarFileData(harFileData);
    }

    setHarFileData(harData, isLoaded = true) {
        this.store.setHarFileData(harData);
        this.setState({ isLoaded });
    }

    render() {
        const { analysedData } = this.store;
        const { isLoaded } = this.state;
        isLoaded && console.log(this.store.analysedData);
        return <div></div>;
    }
}
