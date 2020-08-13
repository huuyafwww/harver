import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { SettingsConfig } from '@config';
import 'react-toastify/dist/ReactToastify.min.css';

const SettingsWrapper = styled.div``;

@inject('store')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'none',
            datas: SettingsConfig.inits,
        };
        this.onGetSettings = this.onGetSettings.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveResult = this.saveResult.bind(this);
        this.resetStatus = this.resetStatus.bind(this);
        this.getTabItems = this.getTabItems.bind(this);
        this.getTabContents = this.getTabContents.bind(this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.send('getSettings');
        this.ipcRenderer.on('getSettingsResult', this.onGetSettings);
        this.ipcRenderer.on('saveSettingsResult', this.saveResult);
    }

    onGetSettings(event, datas) {
        datas !== undefined && this.setState({ datas });
    }

    onSave(status = 'saving') {
        const { datas } = this.state;
        this.setState({ status });
        this.ipcRenderer.send('saveSettings', datas);
    }

    onChange(e, status = 'changed') {
        const { name, value, dataset } = e.currentTarget;
        const { datas } = this.state;
        datas[dataset.type][name] = value;
        this.setState({ status, datas });
    }

    saveResult(event, result, status = 'saved') {
        const { save } = SettingsConfig.toast;
        this.setState({ status });
        toast.success('🎉 保存しました', save);
    }

    resetStatus(status = 'none') {
        this.setState({ status });
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
        const { status, datas } = this.state;
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
                                status={status}
                                datas={datas[type]}
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
