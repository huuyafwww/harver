import React, { Component } from 'react';
import styled from 'styled-components';

const SidebarMenuWrapper = styled.ul``;

export default class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getMenuItemHeader(HeaderName) {
        return <li className="menu-header">{HeaderName}</li>;
    }

    getMenuItems(Items) {
        return Object.keys(Items).map(key => {
            const Item = Items[key];
            return this.getMenuItem(Item, key);
        });
    }

    getMenuItem(Item, key) {
        return (
            <li key={key}>
                <div className="nav-link" href={Item.link}>
                    {Item.icon}
                    <span>{Item.label}</span>
                </div>
            </li>
        );
    }

    getMenu() {
        const { Menu } = this.props;
        return Object.keys(Menu).map(HeaderName => {
            const Items = Menu[HeaderName];
            return [
                this.getMenuItemHeader(HeaderName),
                this.getMenuItems(Items),
            ];
        });
    }

    render() {
        return (
            <SidebarMenuWrapper className="sidebar-menu">
                {this.getMenu()}
            </SidebarMenuWrapper>
        );
    }
}
