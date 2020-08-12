import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { SettingsConfig } from '@config';

const SaveButtonWrapper = styled.div`
    text-align: right;
`;

@inject('store')
@observer
export default class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            saving: false,
            saveDatas: {},
        };
        this.onChange = this.onChange.bind(this);
        this.getFormItems = this.getFormItems.bind(this);
        this.onSave = this.onSave.bind(this);
        this.saveResult = this.saveResult.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.send('getSettings');
        this.ipcRenderer.on('saveSettingsResult', this.saveResult);
        this.ipcRenderer.on('getSettingsResult', this.getResult);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        const { values } = this.state;
        values[name] = value;
        this.setState({ values });
    }

    onSave(saving = true) {
        this.setState({ saving });
        const saveData = {
            Basic: this.state.values,
        };
        this.ipcRenderer.send('saveSettings', saveData);
    }

    saveResult(event, result, saving = false) {
        const saveToast = SettingsConfig.toast.save;
        this.setState({ saving });
        toast.success('🎉 保存しました', saveToast);
    }

    getResult(event, saveDatas) {
        saveDatas !== undefined && this.setState({ saveDatas });
    }

    getFormItems() {
        const { saveDatas } = this.state;
        return (
            <div>
                <div className="section-title mt-0">UI</div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>How to display to HTTP Archive Row.</Form.Label>
                    <div className="selectgroup w-100">
                        <label className="selectgroup-item">
                            <input
                                type="radio"
                                name="displayRow"
                                value="Modal"
                                onChange={this.onChange}
                                checked
                                className="selectgroup-input"
                            />
                            <span className="selectgroup-button">Modal</span>
                        </label>
                        <label className="selectgroup-item">
                            <input
                                type="radio"
                                name="displayRow"
                                value="Column"
                                onChange={this.onChange}
                                className="selectgroup-input"
                            />
                            <span className="selectgroup-button">Column</span>
                        </label>
                    </div>
                </Form.Group>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Basic</Card.Title>
                        {this.getFormItems()}
                        <SaveButtonWrapper>
                            <Button variant="primary" onClick={this.onSave}>
                                保存
                            </Button>
                        </SaveButtonWrapper>
                    </Card.Body>
                </Card>
                <ToastContainer />
            </div>
        );
    }
}
