import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from 'react-bootstrap';
// import UrlParse from 'url-parse';
import { byte2SizeString } from '@helpers';

@inject('store')
@observer
export default class HomeCardBodyBody extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getRow = this.getRow.bind(this);
    }

    getRow(Row, key) {
        const { request, response } = Row;
        const byteSize = byte2SizeString(response.content.size);
        return (
            <tr key={key}>
                <td>{request.url}</td>
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
            <Table striped bordered hover responsive>
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
