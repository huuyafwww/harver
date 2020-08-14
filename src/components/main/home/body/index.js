import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Accordions from '@components/main/home/body/accordion';

@inject('store')
@observer
export default class HomeCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    setHarFileData(harData) {
        this.store.setHarFileData(harData);
        this.store.onLoadFirstHarFile();
    }

    setComponentOptions() {
        const { harData } = this.store;
        this.ComponentOptions = {
            HomeCardBodyHeader: {
                title: 'Info',
                data: harData.log.pages[0],
                toggleVarName: 'isOpenPageInfo',
            },
            HomeCardBodyBody: {
                title: 'Result',
                data: harData.log.entries,
                toggleVarName: 'isOpenPageResult',
            },
        };
    }

    getOpenStatus(toggleVarName) {
        return this.store.nowOpenStatus[toggleVarName];
    }

    toggleAccordionIcon(toggleVarName) {
        this.store.changeOpenStatus(toggleVarName);
    }

    render() {
        const isLoadFirstHarFile = this.store.LoadFirstHarFile;
        isLoadFirstHarFile && this.setComponentOptions();
        return (
            <div>
                {isLoadFirstHarFile && (
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
