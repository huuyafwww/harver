import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { styled } from 'styled-components';
import { Table } from 'react-bootstrap';
import { byte2SizeString, getTooltip } from '@helpers';
import HarDetailModal from '@components/main/home/body/body/modal';

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
        this.getRow = this.getRow.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeModalStatus = this.changeModalStatus.bind(this);
    }

    openModal(e) {
        const { key } = e.currentTarget.dataset;
        this.changeModalStatus(this.state.Rows[key], true);
    }

    closeModal() {
        this.changeModalStatus({}, false);
    }

    changeModalStatus(Row, isOpenModal) {
        this.setState({ Row, isOpenModal });
    }

    getRow(Row, key) {
        const { request, response } = Row;
        const byteSize = byte2SizeString(response.content.size);
        return (
            <tr key={key} onClick={this.openModal} data-key={key}>
                <td>{getTooltip(request.url)}</td>
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
