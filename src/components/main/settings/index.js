import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

const SettingsWrapper = styled.div``;

@inject('store')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SettingsWrapper>
                <Tab.Container id="left-tabs-example" defaultActiveKey="Basic">
                    <Row>
                        <Col md={4}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="Basic">Basic</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col md={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="Basic"></Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </SettingsWrapper>
        );
    }
}
