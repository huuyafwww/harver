import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SidebarConfig } from '@config';
import SidebarHeader from '@components/sidebar/header';
import SidebarMenu from '@components/sidebar/menu';

const SidebarWrapper = styled.div`
    left: ${({ isOpenMenu }) => (isOpenMenu && '0') || '-250'}px;
    transition: all 400ms 0s ease;
`;
const Aside = styled.aside``;

@inject('store')
@observer
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { isOpenMenu } = this.props;
        return (
            <SidebarWrapper className="main-sidebar" isOpenMenu={isOpenMenu}>
                <Aside>
                    <SidebarHeader Info={SidebarConfig.info} />
                    <SidebarMenu Menu={SidebarConfig.menu} />
                </Aside>
            </SidebarWrapper>
        );
    }
}
