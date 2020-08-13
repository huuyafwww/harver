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
        const { types } = SettingsConfig;
        return (
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    {types.map((type, key) => {
                        return (
                            <Nav.Link key={key} eventKey={type}>
                                {type}
                            </Nav.Link>
                        );
                    })}
                </Nav.Item>
            </Nav>
        );
    }

    getTabContents() {
        const { types, components, items, toast, inits } = SettingsConfig;
        return (
            <Tab.Content>
                {types.map((type, key) => {
                    const TargetSettingComponent = components[key];
                    return (
                        <Tab.Pane key={key} eventKey={type}>
                            <TargetSettingComponent
                                type={type}
                                items={items[type]}
                                toast={toast}
                                inits={inits}
                            />
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
                <Tab.Container defaultActiveKey={SettingsConfig.types[0]}>
                    <Row>
                        <Col md={4}>{getTabItems()}</Col>
                        <Col md={8}>{getTabContents()}</Col>
                    </Row>
                </Tab.Container>
            </SettingsWrapper>
        );
    }
}
