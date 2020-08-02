import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const SidebarMenuWrapper = styled.ul``;

@inject('store')
@observer
export default class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = this.props.store;
    }

    getActiveItem(slug) {
        const nowPageSlug = this.store.nowPageSlug;
        return nowPageSlug === slug ? 'active' : '';
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
            <li key={key} className={this.getActiveItem(Item.slug)}>
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
