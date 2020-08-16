import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { byte2SizeString, getTooltip } from '@helpers';
import HarDetailModal from '@components/main/home/body/body/modal';
import HarResultTimeLine from '@components/main/home/body/body/timeline';

const HarResultWrapper = styled.div`
    display: flex;
`;

const TableWrapper = styled.div`
    width: ${({ isShowWaterfall }) => {
        return isShowWaterfall ? '50%;' : '100%';
    }};
    table.table {
        table-layout: fixed;
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
        this.state = {
            resultTableWrapperHeight: 0,
            resultTableTheadHeight: 0,
        };
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
            <tr key={key} onClick={this.onClick} data-key={key} style={thStyle}>
                <td>{getTooltip(request.url)}</td>
                <td>{getTooltip(request.method)}</td>
                <td>{getTooltip(response.status)}</td>
                <td>{getTooltip(response.content.mimeType)}</td>
                <td>{getTooltip(data._resourceType)}</td>
                <td>{getTooltip(byteSize)}</td>
            </tr>
        );
    }

    render() {
        const { closeModal, isColumnDisplayRow } = this;
        const { RowData, isOpenModal, har, isShowWaterfall } = this.props;
        return (
            <HarResultWrapper>
                <TableWrapper
                    isShowWaterfall={isShowWaterfall}
                    id="resultTableWrapper"
                    ref={ele => {
                        this.resultTableWrapperElement = ele;
                    }}
                >
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr
                                id="resultTableThead"
                                ref={ele => {
                                    this.resultTableTheadElement = ele;
                                }}
                            >
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
                </TableWrapper>
                {isShowWaterfall && (
                    <HarResultTimeLine
                        har={har}
                        resultTableWrapperElement={
                            this.resultTableWrapperElement
                        }
                        resultTableTheadElement={this.resultTableTheadElement}
                    />
                )}
                {isOpenModal && !isColumnDisplayRow && (
                    <HarDetailModal RowData={RowData} closeModal={closeModal} />
                )}
            </HarResultWrapper>
        );
    }
}
