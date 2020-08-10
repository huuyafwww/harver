import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, Button, Form } from 'react-bootstrap';

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
        };
        this.onChange = this.onChange.bind(this);
        this.getFormItems = this.getFormItems.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        const { values } = this.state;
        values[name] = value;
        this.setState(values);
    }

    onSave() {
        const { values } = this.state;
    }

    getFormItems() {
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
        );
    }
}
