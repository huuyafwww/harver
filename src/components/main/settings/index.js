import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SettingsConfig } from '@config';

const SettingsWrapper = styled.div``;

@inject('store')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveResult = this.saveResult.bind(this);
        this.getTabItems = this.getTabItems.bind(this);
        this.getTabContents = this.getTabContents.bind(this);
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
        const { onChange, onSave, resetStatus } = this;
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
        const { getTabItems, getTabContents } = this;
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
