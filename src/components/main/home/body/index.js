import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import Accordions from '@components/main/home/body/accordion';

const bindMethods = getBinds(__filename);

@inject('store')
@observer
export default class HomeCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            openStatus: {
                isOpenPageInfo: true,
                isOpenPageResult: false,
            },
        };
        this.store = this.props.store;
        this.event = binds(bindMethods, this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.on('fileData', this.event.onIpc);
    }

    onIpc(event, harFileData) {
        harFileData !== undefined && this.event.setHarFileData(harFileData);
    }

    setHarFileData(harData, isLoaded = true) {
        this.store.setHarFileData(harData);
        this.setState({ isLoaded });
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
        return this.state.openStatus[toggleVarName];
    }

    toggleAccordionIcon(toggleVarName) {
        const { openStatus } = this.state;
        openStatus[toggleVarName] = !openStatus[toggleVarName];
        this.setState({ openStatus });
    }

    render() {
        const {
            setComponentOptions,
            toggleAccordionIcon,
            getOpenStatus,
        } = this.event;
        const { isLoaded } = this.state;
        isLoaded && setComponentOptions();
        return (
            <div>
                {isLoaded && (
                    <Accordions
                        ComponentOptions={this.ComponentOptions}
                        toggleAccordionIcon={toggleAccordionIcon}
                        getOpenStatus={getOpenStatus}
                    />
                )}
            </div>
        );
    }
}
