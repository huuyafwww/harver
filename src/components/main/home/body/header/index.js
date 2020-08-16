import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { ms2s, date2time } from '@helpers';

const TableStyle = {
    marginBottom: 0,
};

@inject('store')
@observer
export default class HomeCardBodyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { har } = this.props;
        const url = har.title;
        const date = date2time(har.startedDateTime);
        const { pageTimings } = har;
        const onContentLoad = ms2s(pageTimings.onContentLoad);
        const onLoad = ms2s(pageTimings.onLoad);
        this.setState({ date, url, onContentLoad, onLoad });
    }

    render() {
        const { date, url, onContentLoad, onLoad } = this.state;
        return (
            <Table style={TableStyle} striped bordered hover>
                <tbody>
                    <tr>
                        <th>日時</th>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <th>ページURL</th>
                        <td>{url}</td>
                    </tr>
                    <tr>
                        <th>onContentLoad</th>
                        <td>{onContentLoad}s</td>
                    </tr>
                    <tr>
                        <th>onLoad</th>
                        <td>{onLoad}s</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}
