import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import HomeCardBodyHeader from '@components/main/home/body/header';

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
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.on('fileData', this.onIpc);
    }

    onIpc(event, harFileData) {
        harFileData !== undefined && this.setHarFileData(harFileData);
    }

    setHarFileData(harData, isLoaded = true) {
        this.store.setHarFileData(harData);
        this.setState({ isLoaded });
    }

    render() {
        const { harData } = this.store;
        const { isLoaded } = this.state;
        return (
            <div>
                {isLoaded && <HomeCardBodyHeader har={harData.log.pages[0]} />}
            </div>
        );
    }
}
