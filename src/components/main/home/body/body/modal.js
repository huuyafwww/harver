import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';
import { getMainHarViewAccordion } from '@helpers';

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
                    <Card>{getMainHarViewAccordion(showDatas)}</Card>
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
        const { request, response } = this.props.RowData;
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
