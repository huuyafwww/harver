import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Accordion, Card } from 'react-bootstrap';

const CardBodyStyle = {
    padding: 0,
};

@inject('store')
@observer
export default class AccordionCollapse extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getRequestComponent = this.getRequestComponent.bind(this);
        this.getResponseComponent = this.getResponseComponent.bind(this);
        this.showDataMethods = [
            this.getRequestComponent,
            this.getResponseComponent,
        ];
    }

    componentDidMount() {}

    getRequestComponent(requestData) {
        return <h4>リクエストデータ</h4>;
    }

    getResponseComponent(responseData) {
        return <h4>レスポンスデータ</h4>;
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
