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
            values: this.props.inits,
            saving: false,
            saveDatas: {},
        };
        this.onChange = this.onChange.bind(this);
        this.getForms = this.getForms.bind(this);
        this.getItems = this.getItems.bind(this);
        this.onSave = this.onSave.bind(this);
        this.setDatas = this.setDatas.bind(this);
        this.setValues = this.setValues.bind(this);
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
        this.setValues(values);
    }

    onSave(saving = true) {
        const { saveDatas, values } = this.state;
        const { type } = this.props;
        saveDatas[type] = values;
        this.setState({ saving });
        this.setDatas(saveDatas);
        this.ipcRenderer.send('saveSettings', saveDatas);
    }

    saveResult(event, result, saving = false) {
        const { save } = this.props.toast;
        this.setState({ saving });
        toast.success('🎉 保存しました', save);
    }

    getResult(event, saveDatas) {
        const { type } = this.props;
        if (saveDatas !== undefined) {
            this.setDatas(saveDatas);
            this.setValues(saveDatas[type]);
        }
    }

    setDatas(saveDatas) {
        this.setState({ saveDatas });
    }

    setValues(values) {
        this.setState({ values });
    }

    getItems(label, input, span) {
        const { values } = this.state;
        const onChange = this[input.onChange];
        return input.values.map((value, key) => {
            const checked = values[input.name] === value ? 'checked' : '';
            return (
                <label className={label.className} key={key}>
                    <input
                        type={input.type}
                        name={input.name}
                        value={value}
                        onChange={onChange}
                        className={input.className}
                        checked={checked}
                    />
                    <span className={span.className}>{span.values[key]}</span>
                </label>
            );
        });
    }

    getForms() {
        const { items } = this.props;
        return (
            <div>
                <div className="section-title mt-0">UI</div>
                {items.map((item, key) => {
                    const { form, wrapper, label, input, span } = item;
                    return (
                        <Form.Group controlId={form.groupControlId} key={key}>
                            <Form.Label>{form.labelValue}</Form.Label>
                            <div className={wrapper.className}>
                                {this.getItems(label, input, span)}
                            </div>
                        </Form.Group>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Basic</Card.Title>
                        {this.getForms()}
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
