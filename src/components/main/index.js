import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const MainWrapper = styled.div``;

@inject('store')
@observer
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = this.props.store;
    }

    render() {
        const { nowPageLabel } = this.store;
        return (
            <MainWrapper className="main-content">
                <section className="section">
                    <div className="section-header">
                        <h1>{nowPageLabel}</h1>
                    </div>
                    <div className="section-body"></div>
                </section>
            </MainWrapper>
        );
    }
}
