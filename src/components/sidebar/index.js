import React, { Component } from 'react';
import styled from 'styled-components';
import { SideberConfig } from '@config';
import SidebarHeader from '@components/sidebar/header';
import SidebarMenu from '@components/sidebar/menu';

const SidebarWrapper = styled.div``;
const Aside = styled.aside``;

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SidebarWrapper className="main-sidebar">
                <Aside>
                    <SidebarHeader Info={SideberConfig.info} />
                    <SidebarMenu Menu={SideberConfig.menu} />
                </Aside>
            </SidebarWrapper>
        );
    }
}
