import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { byte2SizeString } from '@helpers';
import HarDetailModal from '@components/main/home/body/body/modal';

const DisplayText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const TableStyle = {
    tableLayout: 'fixed',
    marginBottom: 0,
};

@inject('store')
@observer
export default class HomeCardBodyBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rows: this.props.har,
            Row: {},
            isOpenModal: false,
        };
        this.getTooltip = this.getTooltip.bind(this);
        this.getRow = this.getRow.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getTooltip(text) {
        return (
            <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
                <DisplayText>{text}</DisplayText>
            </OverlayTrigger>
        );
    }

    openModal(e) {
        const { key } = e.currentTarget.dataset;
        const Row = this.state.Rows[key];
        const isOpenModal = true;
        this.setState({ Row, isOpenModal });
    }

    closeModal() {
        const isOpenModal = false;
        this.setState({ isOpenModal });
    }

    getRow(Row, key) {
        const { request, response } = Row;
        const byteSize = byte2SizeString(response.content.size);
        return (
            <tr key={key} onClick={this.openModal} data-key={key}>
                <td>{this.getTooltip(request.url)}</td>
                <td>{request.method}</td>
                <td>{response.status}</td>
                <td>{response.content.mimeType}</td>
                <td>{Row._resourceType}</td>
                <td>{byteSize}</td>
            </tr>
        );
    }

    render() {
        const { closeModal } = this;
        const { Row, isOpenModal } = this.state;
        const { har } = this.props;
        return (
            <div>
                <Table style={TableStyle} striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>MIME Type</th>
                            <th>Resource Type</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {har.map((Row, key) => {
                            return this.getRow(Row, key);
                        })}
                    </tbody>
                </Table>
                {isOpenModal && (
                    <HarDetailModal Row={Row} closeModal={closeModal} />
                )}
            </div>
        );
    }
}
