import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import HomeCardBody from '@components/main/home/body';
const HomeWrapper = styled.div``;

const CardTitle = styled.h4``;

@inject('store')
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.SelectFile = this.SelectFile.bind(this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
    }

    SelectFile() {
        this.ipcRenderer.send('OpenHarFile');
    }

    render() {
        return (
            <HomeWrapper>
                <Card className="card-primary">
                    <Card.Header>
                        <CardTitle>Har File Viewer</CardTitle>
                        <div className="card-header-action">
                            <Button onClick={this.SelectFile}>
                                ファイルを選択
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <HomeCardBody />
                    </Card.Body>
                </Card>
            </HomeWrapper>
        );
    }
}
