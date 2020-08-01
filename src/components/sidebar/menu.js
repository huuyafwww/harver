import React, { Component } from 'react';
import styled from 'styled-components';

const SidebarMenuWrapper = styled.ul``;

export default class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getMenuItemHeader(Item, key) {
        return (
            <li key={key} className="menu-header">
                {Item.label}
            </li>
        );
    }

    getMenuItem(Item, key) {
        return (
            <li key={key}>
                <div className="nav-link" href={Item.link}>
                    <i className="far">{Item.icon}</i>
                    <span>{Item.label}</span>
                </div>
            </li>
        );
    }

    getMenu() {
        const { Menu } = this.props;
        return Menu.map((Item, key) => {
            return Item.isMenuItemHeader
                ? this.getMenuItemHeader(Item, key)
                : this.getMenuItem(Item, key);
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
