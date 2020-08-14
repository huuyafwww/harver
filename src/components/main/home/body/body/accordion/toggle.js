import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Button, Accordion, Card } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp, BsFiles } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { copyTextConfig } from '@config';

const toggleVarNames = ['isOpenRequestPanel', 'isOpenResponsePanel'];

const ToggleTitleWrapper = styled.span`
    font-size: 1.3em;
`;

const ToggleIconWrapper = styled.span`
    font-size: 2em;
    margin-left: 4px;
`;

const CopyIconWrapper = styled.span`
    font-size: 1.25em;
    cursor: pointer;
    position: absolute;
    right: 20px;
    :hover {
        color: #6777ef;
    }
`;

@inject('store')
@observer
export default class HarDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openStatus: {
                isOpenRequestPanel: false,
                isOpenResponsePanel: false,
            },
        };
        this.onClickAccordionToggle = this.onClickAccordionToggle.bind(this);
        this.toggleAccordionIcon = this.toggleAccordionIcon.bind(this);
        this.onCopyData = this.onCopyData.bind(this);
        this.clipboard = window.require('electron').clipboard;
    }

    onCopyData() {
        const copyData = JSON.stringify(
            this.props.showData.headers,
            null,
            '\t'
        );
        this.clipboard.writeText(copyData);
        toast('🦄 コピーしました', copyTextConfig);
    }

    toggleAccordionIcon(toggleVarName) {
        const { openStatus } = this.state;
        openStatus[toggleVarName] = !openStatus[toggleVarName];
        this.setState({ openStatus });
    }

    onClickAccordionToggle(e) {
        const { toggleVarName } = e.currentTarget.dataset;
        this.toggleAccordionIcon(toggleVarName);
    }

    render() {
        const { eventKey, showDataLabel } = this.props;
        const toggleVarName = toggleVarNames[eventKey];
        const toggleVar = this.state[toggleVarName];
        return (
            <Card.Header>
                <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={eventKey}
                    onClick={this.onClickAccordionToggle}
                    data-toggle-var-name={toggleVarName}
                >
                    <ToggleTitleWrapper>{showDataLabel}</ToggleTitleWrapper>
                    <ToggleIconWrapper>
                        {(toggleVar && <BsCaretUp />) || <BsCaretDown />}
                    </ToggleIconWrapper>
                </Accordion.Toggle>
                <CopyIconWrapper onClick={this.onCopyData}>
                    <BsFiles />
                </CopyIconWrapper>
                <ToastContainer />
            </Card.Header>
        );
    }
}
