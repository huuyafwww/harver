import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import styled from 'styled-components';
import { Button, Accordion, Card } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp, BsFiles } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { copyTextConfig } from '@config';

const bindMethods = getBinds(__filename);

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
        this.event = binds(bindMethods, this);
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
        this.event.toggleAccordionIcon(toggleVarName);
    }

    render() {
        const { onClickAccordionToggle, onCopyData } = this.event;
        const { eventKey, showDataLabel } = this.props;
        const toggleVarName = toggleVarNames[eventKey];
        const toggleVar = this.state[toggleVarName];
        return (
            <Card.Header>
                <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={eventKey}
                    onClick={onClickAccordionToggle}
                    data-toggle-var-name={toggleVarName}
                >
                    <ToggleTitleWrapper>{showDataLabel}</ToggleTitleWrapper>
                    <ToggleIconWrapper>
                        {(toggleVar && <BsCaretUp />) || <BsCaretDown />}
                    </ToggleIconWrapper>
                </Accordion.Toggle>
                <CopyIconWrapper onClick={onCopyData}>
                    <BsFiles />
                </CopyIconWrapper>
                <ToastContainer />
            </Card.Header>
        );
    }
}
