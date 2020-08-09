import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from 'react-bootstrap';
import UrlParse from 'url-parse';

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
        const parsedUrl = new UrlParse(request.url);
        const name = parsedUrl.pathname.split('/').slice(-1)[0];
        return (
            <tr key={key}>
                <td>{name}</td>
                <td>{request.method}</td>
                <td>{response.status}</td>
                <td>{response.content.mimeType}</td>
                <td>{response.content.size}</td>
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
                        <th>Type</th>
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
