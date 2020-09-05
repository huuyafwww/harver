import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import styled from 'styled-components';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SettingsConfig } from '@config';

const bindMethods = getBinds(__filename);

const SettingsWrapper = styled.div``;

@inject('store')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.event = binds(bindMethods, this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.on('saveSettingsResult', this.saveResult);
    }

    onSave() {
        this.props.store.saveSettings();
    }

    onChange(e) {
        const { name, value, dataset } = e.currentTarget;
        this.props.store.editSettings(dataset.type, name, value);
    }

    saveResult(event, result) {
        const { save } = SettingsConfig.toast;
        toast.success('🎉 保存しました', save);
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
        const { onChange, onSave, resetStatus } = this.event;
        const { savedSettings } = this.props.store;
        const { types, components, items } = SettingsConfig;
        return (
            <Tab.Content>
                {types.map((type, key) => {
                    const TargetSettingComponent = components[key];
                    return (
                        <Tab.Pane key={key} eventKey={type}>
                            <TargetSettingComponent
                                onSave={onSave}
                                onChange={onChange}
                                resetStatus={resetStatus}
                                datas={savedSettings[type]}
                                type={type}
                                items={items[type]}
                            />
                        </Tab.Pane>
                    );
                })}
            </Tab.Content>
        );
    }

    render() {
        const { getTabItems, getTabContents } = this.event;
        return (
            <SettingsWrapper>
                <Tab.Container defaultActiveKey={SettingsConfig.types[0]}>
                    <Row>
                        <Col md={4}>{getTabItems()}</Col>
                        <Col md={8}>{getTabContents()}</Col>
                    </Row>
                </Tab.Container>
                <ToastContainer />
            </SettingsWrapper>
        );
    }
}
