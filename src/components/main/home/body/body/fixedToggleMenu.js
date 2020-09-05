import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import styled from 'styled-components';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';

const bindMethods = getBinds(__filename);

const FixedToggleMenuWrapper = styled.div`
    font-size: 1.5em;
    cursor: pointer;
    margin-left: 5px;
    position: absolute;
    ${({ isLeftAlign }) => {
        return isLeftAlign ? 'left: -15px;' : 'right: -10px;';
    }}
    top: 0;
    z-index: 1;
`;

const ToggleIconStyle = {};

@inject('store')
@observer
export default class FixedToggleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.position = this.props.position;
        this.event = binds(bindMethods, this);
    }

    onClick() {
        const { position } = this;
        this.props[`toggle${position}Column`]();
    }

    render() {
        const { position } = this;
        const isOpen = this.props[`isOpen${position}Column`];
        const IconComponent = isOpen
            ? BsChevronDoubleLeft
            : BsChevronDoubleRight;
        const isLeftAlign = position === 'Left';
        return (
            <FixedToggleMenuWrapper isLeftAlign={isLeftAlign}>
                <IconComponent onClick={this.event.onClick} />
            </FixedToggleMenuWrapper>
        );
    }
}
