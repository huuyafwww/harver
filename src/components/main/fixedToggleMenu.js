import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import styled from 'styled-components';
import { BsList, BsX } from 'react-icons/bs';

const bindMethods = getBinds(__filename);

const FixedToggleMenuWrapper = styled.div`
    font-size: 1.8em;
    cursor: pointer;
    margin-left: 5px;
    position: fixed;
    left: ${({ isOpenMenu }) => (isOpenMenu && '250') || '0'}px;
    top: 0;
    z-index: 1;
    transition: all 400ms 0s ease;
`;

const ToggleIconStyle = {};

@inject('store')
@observer
export default class FixedToggleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.event = binds(bindMethods, this);
    }

    onClick() {
        this.props.toggleMenu();
    }

    render() {
        const { isOpenMenu } = this.props;
        const IconComponent = isOpenMenu ? BsX : BsList;
        return (
            <FixedToggleMenuWrapper isOpenMenu={isOpenMenu}>
                <IconComponent onClick={this.event.onClick} />
            </FixedToggleMenuWrapper>
        );
    }
}
