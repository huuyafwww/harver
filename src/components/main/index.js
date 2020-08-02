import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Home from '@components/main/home';

const MainWrapper = styled.div``;

const Components = [Home];

@inject('store')
@observer
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.nowPageLabel = this.props.store.nowPageLabel;
        this.getNowPageComponent(this.nowPageLabel);
    }

    getNowPageComponent(nowPageLabel) {
        for (const Component of Components) {
            const ComponentName = this.getComponentName(Component);
            if (nowPageLabel === ComponentName) {
                this.setNowPageComponent(Component);
                break;
            }
        }
    }

    getComponentName(Component) {
        return Component.wrappedComponent.name;
    }

    setNowPageComponent(Component) {
        this.NowPageComponent = Component;
    }

    render() {
        const { nowPageLabel } = this;
        const { NowPageComponent } = this;
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
