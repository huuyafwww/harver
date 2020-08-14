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
        this.state = {};
        this.ColumnDisplayRow = this.props.store.isColumnDisplayRow;
        this.getRow = this.getRow.bind(this);
        this.onClick = this.onClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onClick(e) {
        const { key } = e.currentTarget.dataset;
        this.props.onChangeStatus(this.props.har[key], true);
    }

    closeModal() {
        this.props.onChangeStatus({}, false);
    }

    getRow(data, key) {
        const { request, response } = data;
        const byteSize = byte2SizeString(response.content.size);
        return (
            <tr key={key} onClick={this.onClick} data-key={key}>
                <td>{getTooltip(request.url)}</td>
                <td>{request.method}</td>
                <td>{response.status}</td>
                <td>{response.content.mimeType}</td>
                <td>{data._resourceType}</td>
                <td>{byteSize}</td>
            </tr>
        );
    }

    render() {
        const { closeModal } = this;
        const { RowData, isOpenModal, har } = this.props;
        const { isColumnDisplayRow } = this;
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
                        {har.map((data, key) => {
                            return this.getRow(data, key);
                        })}
                    </tbody>
                </Table>
                {isOpenModal && !isColumnDisplayRow && (
                    <HarDetailModal RowData={RowData} closeModal={closeModal} />
                )}
            </div>
        );
    }
}
