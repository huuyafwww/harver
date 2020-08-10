import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';
import AccordionPanel from '@components/main/home/body/body/modal/accordion';

const showDataLabels = ['request', 'response'];

@inject('store')
@observer
export default class HarDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.handleClose = this.handleClose.bind(this);
        this.getModalHeader = this.getModalHeader.bind(this);
        this.getModalBody = this.getModalBody.bind(this);
        this.getModalFooter = this.getModalFooter.bind(this);
    }

    handleClose() {
        const show = false;
        this.setState({ show });
        this.props.closeModal();
    }

    getModalHeader() {
        return (
            <Modal.Header closeButton>
                <Modal.Title>Modal Header</Modal.Title>
            </Modal.Header>
        );
    }

    getModalBody(showDatas) {
        return (
            <Modal.Body>
                <Accordion>
                    {showDataLabels.map((showDataLabel, key) => {
                        const eventKey = String(key);
                        const showData = showDatas[key];
                        return (
                            <AccordionPanel
                                key={eventKey}
                                eventKey={eventKey}
                                showDataLabel={showDataLabel}
                                showData={showData}
                            />
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
