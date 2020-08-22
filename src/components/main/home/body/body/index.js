import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { byte2SizeString, getTooltip } from '@helpers';
import HarDetailModal from '@components/main/home/body/body/modal';
import HarResultTimeLine from '@components/main/home/body/body/timeline';
const parseUrl = require('url-parse');

const HarResultWrapper = styled.div`
    display: flex;
`;

const TableWrapper = styled.div`
    width: 100%;
    table.table {
        margin-bottom: 0;
    }
`;

const thStyle = {
    cursor: 'pointer',
};

const TimelineWrapper = styled.div`
    width: 50%;
`;

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

    getRow(
        data,
        key,
        har,
        isShowWaterfall,
        isShowMethod,
        isShowStatus,
        isShowMimeType,
        isShowResourceType,
        isShowSize
    ) {
        const { request, response, _resourceType } = data;
        const { url, method } = request;
        const { status, content } = response;
        const { size, mimeType } = content;
        const byteSize = byte2SizeString(size);
        const { hostname } = new parseUrl(url);
        return (
            <tr key={key} onClick={this.onClick} data-key={key} style={thStyle}>
                <td>{getTooltip(hostname, url)}</td>
                {isShowMethod && <td>{getTooltip(method)}</td>}
                {isShowStatus && <td>{getTooltip(status)}</td>}
                {isShowMimeType && <td>{getTooltip(mimeType)}</td>}
                {isShowResourceType && <td>{getTooltip(_resourceType)}</td>}
                {isShowSize && <td>{getTooltip(byteSize)}</td>}
                {key === 0 && isShowWaterfall && (
                    <HarResultTimeLine har={har} />
                )}
            </tr>
        );
    }

    render() {
        const { closeModal, isColumnDisplayRow } = this;
        const {
            RowData,
            isOpenModal,
            har,
            isShowWaterfall,
            isShowMethod,
            isShowStatus,
            isShowMimeType,
            isShowResourceType,
            isShowSize,
        } = this.props;
        console.log(this.props);
        return (
            <HarResultWrapper>
                <TableWrapper>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                {isShowMethod && <th>Method</th>}
                                {isShowStatus && <th>Status</th>}
                                {isShowMimeType && <th>MIME Type</th>}
                                {isShowResourceType && <th>Resource Type</th>}
                                {isShowSize && <th>Size</th>}
                                {isShowWaterfall && <th>Waterfall</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {har.map((data, key) => {
                                return this.getRow(
                                    data,
                                    key,
                                    har,
                                    isShowWaterfall,
                                    isShowMethod,
                                    isShowStatus,
                                    isShowMimeType,
                                    isShowResourceType,
                                    isShowSize
                                );
                            })}
                        </tbody>
                    </Table>
                </TableWrapper>
                {isOpenModal && !isColumnDisplayRow && (
                    <HarDetailModal RowData={RowData} closeModal={closeModal} />
                )}
            </HarResultWrapper>
        );
    }
}
