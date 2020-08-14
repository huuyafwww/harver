import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { getNowPageComponent } from '@helpers';
import Home from '@components/main/home';
import Settings from '@components/main/settings';
import FixedToggleMenu from '@components/main/fixedToggleMenu';

const MainWrapper = styled.div`
    position: relative;
`;

const MainComponentWrapper = styled.div`
    padding-left: ${({ isOpenMenu }) => (isOpenMenu && '280') || '30'}px;
    transition: all 400ms 0s ease;
`;

const SectionHeaderRightWrapper = styled.div``;

const Components = [Home, Settings];

@inject('store')
@observer
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.SelectFile = this.SelectFile.bind(this);
        this.setNowPageComponent = this.setNowPageComponent.bind(this);
    }

    componentDidMount() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
    }

    setNowPageComponent() {
        this.nowPageLabel = this.props.store.nowPageLink;
        this.NowPageComponent = getNowPageComponent(
            this.nowPageLabel,
            Components
        );
    }

    SelectFile() {
        this.props.store.onLoadNewHarFile = true;
        this.ipcRenderer.send('OpenHarFile');
    }

    render() {
        this.setNowPageComponent();
        const { nowPageLabel, NowPageComponent } = this;
        const { isOpenMenu, toggleMenu } = this.props;
        return (
            <MainWrapper>
                <FixedToggleMenu
                    isOpenMenu={isOpenMenu}
                    toggleMenu={toggleMenu}
                />
                <MainComponentWrapper
                    className="main-content"
                    isOpenMenu={isOpenMenu}
                >
                    <section className="section">
                        <div className="section-header">
                            <h1>{nowPageLabel}</h1>
                            {nowPageLabel === 'Home' && (
                                <SectionHeaderRightWrapper>
                                    <Button onClick={this.SelectFile}>
                                        ファイルを選択
                                    </Button>
                                </SectionHeaderRightWrapper>
                            )}
                        </div>
                        <div className="section-body">
                            <NowPageComponent />
                        </div>
                    </section>
                </MainComponentWrapper>
            </MainWrapper>
        );
    }
}
