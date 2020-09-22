import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import {
    byte2SizeString,
    getTooltip,
    arrayKey2Column,
    binds,
    getBinds,
} from '@helpers';
import { harResultConfig } from '@config';
import HarDetailModal from '@components/main/home/body/body/modal';
import HarResultTimeLine from '@components/main/home/body/body/timeline';
const parseUrl = require('url-parse');

const { isShow, resultColumn, toggleIcon } = harResultConfig;
const bindMethods = getBinds(__filename);

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
        this.event = binds(bindMethods, this);
    }

    onClick(e) {
        const { key } = e.currentTarget.dataset;
        this.props.onChangeStatus(this.props.har[key], true);
    }

    closeModal() {
        this.props.onChangeStatus({}, false);
    }

    getRow(data, trKey) {
        const { getTableBodyItems } = this.event;
        return (
            <tr
                key={trKey}
                onClick={this.event.onClick}
                data-key={trKey}
                style={thStyle}
            >
                {getTableBodyItems(data, trKey)}
            </tr>
        );
    }

    getTableBodyItems(data, trKey) {
        const { har } = this.props;
        return (
            <>
                {Object.keys(isShow).map((varName, key) => {
                    const isShowItem = this.props[varName];
                    if (varName !== 'Waterfall') {
                        const params = resultColumn[varName].params;
                        const itemData = arrayKey2Column(data, params);
                        let showData = getTooltip(itemData);
                        if (varName === 'Url') {
                            const parsedUrl = new parseUrl(itemData);
                            const { hostname } = parsedUrl;
                            showData = getTooltip(hostname, itemData);
                        }
                        if (varName === 'Size') {
                            const byteSize = byte2SizeString(itemData);
                            showData = getTooltip(byteSize);
                        }
                        return isShowItem && <td key={key}>{showData}</td>;
                    }
                    return (
                        trKey === 0 &&
                        isShowItem && <HarResultTimeLine key={key} har={har} />
                    );
                })}
            </>
        );
    }

    getTableHeadItems() {
        return (
            <>
                {Object.keys(isShow).map((varName, key) => {
                    const isShowItem = this.props[varName];
                    const itemLabel = toggleIcon[varName].label;
                    return isShowItem && <th key={key}>{itemLabel}</th>;
                })}
            </>
        );
    }

    render() {
        const { closeModal, getRow, getTableHeadItems } = this.event;
        const { isColumnDisplayRow } = this;
        const { RowData, isOpenModal, har } = this.props;
        return (
            <HarResultWrapper>
                <TableWrapper>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>{getTableHeadItems()}</tr>
                        </thead>
                        <tbody>
                            {har.map((data, key) => {
                                return getRow(data, key);
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
