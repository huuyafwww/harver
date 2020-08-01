import React, { Component } from 'react';
import styled from 'styled-components';

const SidebarHeaderWrapper = styled.div``;

export default class SidebarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { Info } = this.props;
        return (
            <SidebarHeaderWrapper>
                <div className="sidebar-brand">{Info.pcName}</div>
                <div className="sidebar-brand sidebar-brand-sm">
                    {Info.spName}
                </div>
            </SidebarHeaderWrapper>
        );
    }
}
