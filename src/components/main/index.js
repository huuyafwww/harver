import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { getNowPageComponent } from '@helpers';
import Home from '@components/main/home';

const MainWrapper = styled.div``;

const Components = [Home];

@inject('store')
@observer
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.nowPageLabel = this.props.store.PageLabel;
        this.setNowPageComponent(this.nowPageLabel, Components);
    }

    setNowPageComponent(nowPageLabel, Components) {
        this.NowPageComponent = getNowPageComponent(nowPageLabel, Components);
    }

    render() {
        const { nowPageLabel, NowPageComponent } = this;
        return (
            <MainWrapper className="main-content">
                <section className="section">
                    <div className="section-header">
                        <h1>{nowPageLabel}</h1>
                    </div>
                    <div className="section-body">
                        <NowPageComponent />
                    </div>
                </section>
            </MainWrapper>
        );
    }
}
