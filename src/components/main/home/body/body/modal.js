import React, { Component, useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

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

    componentDidMount() {}

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

    getModalBody() {
        return (
            <Modal.Body>Target Request Detail on this modal body.</Modal.Body>
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
                    {this.getModalBody()}
                    {this.getModalFooter()}
                </Modal>
            </div>
        );
    }
}
