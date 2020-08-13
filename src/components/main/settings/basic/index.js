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
        this.state = {};
        this.getForms = this.getForms.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems(label, input, span) {
        const { datas, type } = this.props;
        const onChange = this.props[input.onChange];
        return input.values.map((value, key) => {
            const checked = datas[input.name] === value;
            return (
                <label className={label.className} key={key}>
                    <input
                        type={input.type}
                        name={input.name}
                        value={value}
                        onChange={onChange}
                        className={input.className}
                        checked={checked}
                        data-type={type}
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
        const { onSave } = this.props;
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Basic</Card.Title>
                    {this.getForms()}
                    <SaveButtonWrapper>
                        <Button variant="primary" onClick={onSave}>
                            保存
                        </Button>
                    </SaveButtonWrapper>
                </Card.Body>
            </Card>
        );
    }
}
