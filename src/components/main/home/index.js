import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
const { ipcRenderer } = window.require('electron');
const HomeWrapper = styled.div``;

const CardTitle = styled.h4``;

@inject('store')
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    SelectFile() {
        ipcRenderer.send('OpenHarFile');
    }

    render() {
        return (
            <HomeWrapper>
                <Card className="card-primary">
                    <Card.Header>
                        <CardTitle>JSON</CardTitle>
                        <div className="card-header-action">
                            <Button onClick={this.SelectFile}>
                                ファイルを選択
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
            </HomeWrapper>
        );
    }
}
