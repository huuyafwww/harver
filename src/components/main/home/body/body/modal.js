import React, { Component, useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

const showDataLabels = ['request', 'response'];

const toggleVarNames = ['isOpenRequestPanel', 'isOpenResponsePanel'];

const ToggleTitleWrapper = styled.span`
    font-size: 1.3em;
`;

const ToggleIconWrapper = styled.span`
    font-size: 2em;
    margin-left: 4px;
`;

const CardBodyStyle = {
    padding: 0,
};

@inject('store')
@observer
export default class HarDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            openStatus: {
                isOpenRequestPanel: false,
                isOpenResponsePanel: false,
            },
        };
        this.handleClose = this.handleClose.bind(this);
        this.getModalHeader = this.getModalHeader.bind(this);
        this.getModalBody = this.getModalBody.bind(this);
        this.getModalFooter = this.getModalFooter.bind(this);
        this.getAccordionToggle = this.getAccordionToggle.bind(this);
        this.getAccordionCollapse = this.getAccordionCollapse.bind(this);
        this.getRequestComponent = this.getRequestComponent.bind(this);
        this.getResponseComponent = this.getResponseComponent.bind(this);
        this.onClickAccordionToggle = this.onClickAccordionToggle.bind(this);
        this.toggleAccordionIcon = this.toggleAccordionIcon.bind(this);
        this.showDataMethods = [
            this.getRequestComponent,
            this.getResponseComponent,
        ];
    }

    componentDidMount() {}

    toggleAccordionIcon(toggleVarName) {
        const { openStatus } = this.state;
        openStatus[toggleVarName] = !openStatus[toggleVarName];
        this.setState({ openStatus });
    }

    onClickAccordionToggle(e) {
        const { toggleVarName } = e.currentTarget.dataset;
        this.toggleAccordionIcon(toggleVarName);
    }

    handleClose() {
        const show = false;
        this.setState({ show });
        this.props.closeModal();
    }

    getRequestComponent(requestData) {
        return <h4>リクエストデータ</h4>;
    }

    getResponseComponent(responseData) {
        return <h4>レスポンスデータ</h4>;
    }

    getAccordionToggle(eventKey, showDataLabel) {
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
            </Card.Header>
        );
    }

    getAccordionCollapse(eventKey, data) {
        return (
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body style={CardBodyStyle}>
                    {this.showDataMethods[eventKey](data)}
                </Card.Body>
            </Accordion.Collapse>
        );
    }

    getModalHeader() {
        return (
            <Modal.Header closeButton>
                <Modal.Title>Modal Header</Modal.Title>
            </Modal.Header>
        );
    }

    getModalBody(showDatas) {
        const { getAccordionToggle, getAccordionCollapse } = this;
        return (
            <Modal.Body>
                <Accordion>
                    {showDataLabels.map((showDataLabel, key) => {
                        const eventKey = String(key);
                        const showData = showDatas[key];
                        return (
                            <Card key={key}>
                                {getAccordionToggle(eventKey, showDataLabel)}
                                {getAccordionCollapse(eventKey, showData)}
                            </Card>
                        );
                    })}
                </Accordion>
            </Modal.Body>
        );
    }

    getModalFooter() {
        const { handleClose } = this;
        return (
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    閉じる
                </Button>
            </Modal.Footer>
        );
    }

    render() {
        const { handleClose } = this;
        const { show } = this.state;
        const { Row } = this.props;
        const { request, response } = Row;
        return (
            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    {this.getModalHeader()}
                    {this.getModalBody([request, response])}
                    {this.getModalFooter()}
                </Modal>
            </div>
        );
    }
}
