import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getMainHarViewAccordion, binds, getBinds } from '@helpers';
import styled from 'styled-components';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';

const bindMethods = getBinds(__filename);

@inject('store')
@observer
export default class HarDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.event = binds(bindMethods, this);
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
        const { handleClose } = this.event;
        return (
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    閉じる
                </Button>
            </Modal.Footer>
        );
    }

    render() {
        const {
            handleClose,
            getModalHeader,
            getModalBody,
            getModalFooter,
        } = this.event;
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
                    {getModalHeader()}
                    {getModalBody([request, response])}
                    {getModalFooter()}
                </Modal>
            </div>
        );
    }
}
