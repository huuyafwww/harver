import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const SidebarMenuWrapper = styled.ul``;

@inject('store')
@observer
export default class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = this.props.store;
        this.nowPageSlug = this.store.PageSlug;
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const { label } = e.currentTarget.dataset;
        this.store.pageLinkToggle(label);
    }

    setPageLabel(Item) {
        const { slug, label } = Item;
        this.nowPageSlug === slug && this.store.setPageLabel(label);
    }

    getActiveItem(slug) {
        return this.nowPageSlug === slug ? 'active' : '';
    }

    getMenuItemHeader(Item, key) {
        return (
            <li key={key} className="menu-header">
                {Item.label}
            </li>
        );
    }

    getMenuItem(Item, key) {
        this.setPageLabel(Item);
        return (
            <li
                key={key}
                className={this.getActiveItem(Item.slug)}
                onClick={this.onClick}
                data-label={Item.label}
            >
                <div className="nav-link">
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
