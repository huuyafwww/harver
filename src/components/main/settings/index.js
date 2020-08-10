import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { SettingsConfig } from '@config';

const SettingsWrapper = styled.div``;

@inject('store')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getTabItems = this.getTabItems.bind(this);
        this.getTabContents = this.getTabContents.bind(this);
    }

    getTabItems() {
        const { items } = SettingsConfig;
        return (
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    {items.map((item, key) => {
                        return (
                            <Nav.Link key={key} eventKey={item}>
                                {item}
                            </Nav.Link>
                        );
                    })}
                </Nav.Item>
            </Nav>
        );
    }

    getTabContents() {
        const { items, components } = SettingsConfig;
        return (
            <Tab.Content>
                {items.map((item, key) => {
                    const TargetSettingComponent = components[key];
                    return (
                        <Tab.Pane key={key} eventKey={item}>
                            <TargetSettingComponent />
                        </Tab.Pane>
                    );
                })}
            </Tab.Content>
        );
    }

    render() {
        const { getTabItems, getTabContents } = this;
        return (
            <SettingsWrapper>
                <Tab.Container defaultActiveKey={SettingsConfig.items[0]}>
                    <Row>
                        <Col md={4}>{getTabItems()}</Col>
                        <Col md={8}>{getTabContents()}</Col>
                    </Row>
                </Tab.Container>
            </SettingsWrapper>
        );
    }
}
