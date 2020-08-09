import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Accordions from '@components/main/home/body/accordion';

@inject('store')
@observer
export default class HomeCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            openStatus: {
                isOpenPageInfo: true,
            },
        };
        this.store = this.props.store;
        this.onIpc = this.onIpc.bind(this);
        this.setHarFileData = this.setHarFileData.bind(this);
        this.getOpenStatus = this.getOpenStatus.bind(this);
        this.setComponentOptions = this.setComponentOptions.bind(this);
        this.toggleAccordionIcon = this.toggleAccordionIcon.bind(this);
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

    setComponentOptions() {
        const { harData } = this.store;
        this.ComponentOptions = {
            HomeCardBodyHeader: {
                title: 'ページ情報',
                data: harData.log.pages[0],
                toggleVarName: 'isOpenPageInfo',
            },
        };
    }

    getOpenStatus(toggleVarName) {
        return this.state.openStatus[toggleVarName];
    }

    toggleAccordionIcon(target) {
        const { openStatus } = this.state;
        openStatus[target] = !openStatus[target];
        this.setState({ openStatus });
    }

    render() {
        const { isLoaded } = this.state;
        isLoaded && this.setComponentOptions();
        return (
            <div>
                {isLoaded && (
                    <Accordions
                        ComponentOptions={this.ComponentOptions}
                        toggleAccordionIcon={this.toggleAccordionIcon}
                        getOpenStatus={this.getOpenStatus}
                    />
                )}
            </div>
        );
    }
}
