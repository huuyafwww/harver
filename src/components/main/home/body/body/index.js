import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import UrlParse from 'url-parse';
import { byte2SizeString } from '@helpers';

const DisplayText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const TableStyle = {
    tableLayout: 'fixed',
};

@inject('store')
@observer
export default class HomeCardBodyBody extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getTooltip = this.getTooltip.bind(this);
        this.getRow = this.getRow.bind(this);
    }

    getTooltip(text) {
        return (
            <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
                <DisplayText>{text}</DisplayText>
            </OverlayTrigger>
        );
    }

    getRow(Row, key) {
        const { request, response } = Row;
        const byteSize = byte2SizeString(response.content.size);
        return (
            <tr key={key}>
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
        const { har } = this.props;
        return (
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
        );
    }
}
