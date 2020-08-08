import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Accordion, Button } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import HomeCardBodyHeader from '@components/main/home/body/header';

const ToggleTitleWrapper = styled.span`
    font-size: 1.3em;
`;

const ToggleIconWrapper = styled.span`
    font-size: 2em;
`;

@inject('store')
@observer
export default class HomeCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isOpenPageInfo: true,
        };
        this.store = this.props.store;
        this.onIpc = this.onIpc.bind(this);
        this.setHarFileData = this.setHarFileData.bind(this);
        this.togglePageInfo = this.togglePageInfo.bind(this);
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

    togglePageInfo() {
        const isOpenPageInfo = !this.state.isOpenPageInfo;
        this.setState({ isOpenPageInfo });
    }

    render() {
        const { harData } = this.store;
        const { isLoaded, isOpenPageInfo } = this.state;
        return (
            <div>
                {isLoaded && (
                    <Accordion defaultActiveKey="0">
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="0"
                            onClick={this.togglePageInfo}
                        >
                            <ToggleTitleWrapper>ページ情報</ToggleTitleWrapper>
                            <ToggleIconWrapper>
                                {(isOpenPageInfo && <BsCaretUp />) || (
                                    <BsCaretDown />
                                )}
                            </ToggleIconWrapper>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <HomeCardBodyHeader har={harData.log.pages[0]} />
                        </Accordion.Collapse>
                    </Accordion>
                )}
            </div>
        );
    }
}
