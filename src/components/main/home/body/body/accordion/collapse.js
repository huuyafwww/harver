import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getTooltip, binds, getBinds } from '@helpers';
import styled from 'styled-components';
import { Accordion, Card, Table } from 'react-bootstrap';

const bindMethods = getBinds(__filename);

const CardBodyStyle = {
    padding: 0,
};

const TableStyle = {
    tableLayout: 'fixed',
    marginBottom: 0,
};

@inject('store')
@observer
export default class AccordionCollapse extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.event = binds(bindMethods, this);
        this.showDataMethods = [
            this.event.getRequestComponent,
            this.event.getResponseComponent,
        ];
    }

    componentDidMount() {}

    getDataHeaderComponent(Rows) {
        return (
            <Table style={TableStyle} striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {Rows.map((RowData, key) => {
                        return (
                            <tr key={key}>
                                <td>{getTooltip(RowData.name)}</td>
                                <td>{getTooltip(RowData.value)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    getRequestComponent(requestData) {
        const { headers } = requestData;
        return <div>{this.event.getDataHeaderComponent(headers)}</div>;
    }

    getResponseComponent(responseData) {
        const { headers } = responseData;
        return <div>{this.event.getDataHeaderComponent(headers)}</div>;
    }

    render() {
        const { eventKey, showData } = this.props;
        return (
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body style={CardBodyStyle}>
                    {this.showDataMethods[eventKey](showData)}
                </Card.Body>
            </Accordion.Collapse>
        );
    }
}
